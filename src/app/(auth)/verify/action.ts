'use server';

import { parseWithZod } from '@conform-to/zod';
import { verifySchema } from '#app/(auth)/schema';
import { db } from '#db';
import { and, eq } from 'drizzle-orm';
import { verificationCodes } from '#db/schema/auth';
import { z } from 'zod';
import { isWithinExpirationDate } from 'oslo';
import { match } from 'ts-pattern';
import { handleSignupVerification } from '#app/(auth)/signup/action';
import { handleOnboardingVerification } from '#app/(auth)/onboarding/action';

export const verify = async (prevState: unknown, formDate: FormData) => {
	const submission = await parseWithZod(formDate, {
		schema: verifySchema.transform(async (data, ctx) => {
			const { code } = data;
			const existingCode = await db.query.verificationCodes.findFirst({
				where: and(
					eq(verificationCodes.target, data.target),
					eq(verificationCodes.code, data.code),
				),
			});

			if (!existingCode || existingCode.code !== code) {
				ctx.addIssue({
					path: ['code'],
					code: z.ZodIssueCode.custom,
					message: 'Invalid Code',
				});
				return z.NEVER;
			}

			if (
				existingCode.expiresAt &&
				!isWithinExpirationDate(new Date(existingCode.expiresAt))
			) {
				ctx.addIssue({
					path: ['code'],
					code: z.ZodIssueCode.custom,
					message: 'Verification code expired',
				});
				return z.NEVER;
			}

			return { ...data, code: existingCode };
		}),
		async: true,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const { target, code } = submission.value;

	await db
		.update(verificationCodes)
		.set({
			isUsed: true,
		})
		.where(eq(verificationCodes.id, code.id))
		.execute();

	return match(code.type)
		.with('signup', async () => {
			return handleSignupVerification(target);
		})
		.with('onboarding', async () => {
			return handleOnboardingVerification(target, code.userId);
		})
		.with('reset-password', () => {
			// TODO
			throw new Error('Not implemented');
		})
		.with('change-email', () => {
			// TODO
			throw new Error('Not implemented');
		})
		.with('2fa', () => {
			// TODO
			throw new Error('Not implemented');
		})
		.exhaustive();
};
