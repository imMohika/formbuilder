'use server';

import { parseWithZod } from '@conform-to/zod';
import { db } from '#db';
import { and, eq, not } from 'drizzle-orm';
import { users } from '#db/schema/auth';
import { z } from 'zod';
import { updateSlugSchema } from '#app/dashboard/settings/schema';
import { requireUser } from '#lib/auth';
import { revalidatePath } from 'next/cache';

export const updateSlug = async (prevState: unknown, formDate: FormData) => {
	const submission = await parseWithZod(formDate, {
		schema: updateSlugSchema.transform(async (data, ctx) => {
			const user = await requireUser();
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

	await db.update(users).set({
		slug,
	});

	revalidatePath('/dashboard');
	return submission.reply({
		resetForm: true,
	});
};
