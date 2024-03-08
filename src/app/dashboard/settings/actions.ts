'use server';

import { parseWithZod } from '@conform-to/zod';
import { db } from '#db';
import { and, eq, not } from 'drizzle-orm';
import { inviteCodes, users } from '#db/schema/auth';
import { z } from 'zod';
import {
	regenerateInviteCodeSchema,
	updateSlugSchema,
} from '#app/dashboard/settings/schema';
import { requireUser } from '#lib/auth';
import { revalidatePath } from 'next/cache';
import { createUniqueInviteCode } from '#utils/invite-code';

export const updateSlug = async (prevState: unknown, formDate: FormData) => {
	const user = await requireUser();

	const submission = await parseWithZod(formDate, {
		schema: updateSlugSchema.transform(async (data, ctx) => {
			const existingSlug = await db.query.users.findFirst({
				where: and(eq(users.slug, data.slug), not(eq(users.id, user.id))),
			});
			if (existingSlug) {
				ctx.addIssue({
					path: ['slug'],
					code: z.ZodIssueCode.custom,
					message: 'Slug is already taken',
				});
				return z.NEVER;
			}

			return data;
		}),
		async: true,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const { slug } = submission.value;

	await db
		.update(users)
		.set({
			slug,
		})
		.where(eq(users.id, user.id));

	revalidatePath('/dashboard');
	return submission.reply({
		resetForm: true,
	});
};

export const regenerateInviteCode = async (
	prevState: unknown,
	formDate: FormData,
) => {
	const user = await requireUser();
	const submission = await parseWithZod(formDate, {
		schema: regenerateInviteCodeSchema,
		async: true,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const { oldInviteCode } = submission.value;

	const newInviteCode = await createUniqueInviteCode();
	console.log({ newInviteCode, oldInviteCode });

	await db.transaction(async tx => {
		if (oldInviteCode) {
			await tx
				.update(inviteCodes)
				.set({
					isRevoked: true,
				})
				.where(
					and(
						eq(inviteCodes.ownerId, user.id),
						eq(inviteCodes.code, oldInviteCode),
					),
				);
		}
		await tx.insert(inviteCodes).values({
			code: newInviteCode,
			ownerId: user.id,
		});
	});

	revalidatePath('/dashboard');
	return submission.reply({
		resetForm: true,
	});
};
