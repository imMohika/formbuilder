'use server';

import { parseWithZod } from '@conform-to/zod';
import { loginSchema, verifySchema } from '#app/(auth)/schema';
import { redirect } from 'next/navigation';
import { db } from '#db';
import { users, verificationCodes } from '#db/schema';
import { and, eq, gt } from 'drizzle-orm';
import { z } from 'zod';
import { isWithinExpirationDate } from 'oslo';
import { auth, getAuth } from '#lib/auth';
import { cookies } from 'next/headers';
import { createOtp } from '#utils/otp';
import { getBaseUrl } from '@/utils/misc';
import { revalidatePath } from 'next/cache';

export const login = async (prevState: unknown, formDate: FormData) => {
	const submission = await parseWithZod(formDate, {
		schema: loginSchema.transform(async (data, ctx) => {
			if (data.intent !== 'request-code') {
				return { ...data };
			}
			const existingOtp = await db.query.verificationCodes.findFirst({
				where: and(
					eq(verificationCodes.target, data.email),
					eq(verificationCodes.isUsed, false),
					gt(verificationCodes.expiresAt, new Date().valueOf()),
				),
			});

			if (existingOtp) {
				ctx.addIssue({
					path: ['email'],
					code: z.ZodIssueCode.custom,
					message: 'You already requested for a code',
				});
			}
			return { ...data };
		}),
		async: true,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const { email, intent } = submission.value;

	const url = new URL(`${getBaseUrl()}/verify`);
	url.searchParams.set('target', email);
	if (intent === 'verify-code') {
		return redirect(url.toString());
	}

	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, email),
		columns: {
			id: true,
		},
	});

	const otp = await createOtp(existingUser?.id, email);
	console.log(`OTP for ${email} is ${otp}`);
	// TODO: send otp to email

	redirect(url.toString());
};

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

			await db
				.update(verificationCodes)
				.set({
					isUsed: true,
				})
				.where(eq(verificationCodes.id, existingCode.id))
				.execute();

			return { ...data, ...existingCode };
		}),
		async: true,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const { userId, target } = submission.value;

	const user = await getOrCreateUser(userId, target);

	if (!user) {
		// TODO: error handling
		console.error('failed to getOrCreateUser');
		return;
	}

	// TODO: add session info like browser and login time
	const session = await auth.createSession(user.id, {});
	const sessionCookie = auth.createSessionCookie(session.id);
	cookies().set(sessionCookie);

	redirect('/');
};

async function getOrCreateUser(userId: string | null, email: string) {
	if (userId) {
		return await db.query.users
			.findFirst({
				where: eq(users.id, userId),
			})
			.execute();
	}

	const newUser = await db
		.insert(users)
		.values({
			email,
		})
		.returning()
		.execute()
		.then(t => t[0]);

	console.log('Created new user', { newUser });
	return newUser;
}

export const logout = async () => {
	const { session } = await getAuth();

	if (session) {
		await auth.invalidateSession(session.id);
		cookies().delete('auth_session');
	}

	revalidatePath('/', 'layout');
};
