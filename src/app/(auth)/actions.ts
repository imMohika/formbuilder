'use server';

import { parseWithZod } from '@conform-to/zod';
import {
	loginSchema,
	onboardingSchema,
	passwordLoginSchema,
	verifySchema,
} from '#app/(auth)/schema';
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
import { createSession, createUser, getUser } from '#app/(auth)/utils';
import { match } from 'ts-pattern';
import { Argon2id } from 'oslo/password';

export const login = async (prevState: unknown, formDate: FormData) => {
	const submission = await parseWithZod(formDate, {
		schema: loginSchema,
		async: true,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const { email, intent } = submission.value;

	if (intent === 'verify-code') {
		const url = new URL(`${getBaseUrl()}/verify`);
		url.searchParams.set('target', email);
		return redirect(url.toString());
	}

	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, email),
	});

	if (existingUser?.password) {
		const url = new URL(`${getBaseUrl()}/login/password`);
		url.searchParams.set('target', email);
		return redirect(url.toString());
	}

	// put things that require OTP (eq. signup, onboarding) after this
	const existingOtp = await db.query.verificationCodes.findFirst({
		where: and(
			eq(verificationCodes.target, email),
			eq(verificationCodes.isUsed, false),
			gt(verificationCodes.expiresAt, new Date().valueOf()),
		),
	});

	if (existingOtp) {
		return submission.reply({
			fieldErrors: {
				email: ['You already requested for a code'],
			},
		});
	}

	// signup
	if (!existingUser) {
		const otp = await createOtp(null, email, 'signup');
		console.log(`Signup OTP for ${email} is ${otp}`);

		const url = new URL(`${getBaseUrl()}/verify`);
		url.searchParams.set('target', email);
		return redirect(url.toString());
	}

	// onboarding
	const otp = await createOtp(existingUser.id, email, 'onboarding');
	console.log(`Onboarding OTP for ${email} is ${otp}`);

	const url = new URL(`${getBaseUrl()}/verify`);
	url.searchParams.set('target', email);
	return redirect(url.toString());
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
			const user = await createUser(target);
			const { sessionCookie } = await createSession(user);
			cookies().set(sessionCookie);

			const url = new URL(`${getBaseUrl()}/onboarding`);
			url.searchParams.set('target', target);
			return redirect(url.toString());
		})
		.with('onboarding', async () => {
			const user = await getUser(target, code.userId);
			if (!user) {
				throw new Error("User doesn't exist");
			}
			const { sessionCookie } = await createSession(user);
			cookies().set(sessionCookie);

			const url = new URL(`${getBaseUrl()}/onboarding`);
			url.searchParams.set('target', target);
			return redirect(url.toString());
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

export const logout = async () => {
	const { session } = await getAuth();

	if (session) {
		await auth.invalidateSession(session.id);
		cookies().delete('auth_session');
	}

	revalidatePath('/', 'layout');
};

export const onboarding = async (prevState: unknown, formDate: FormData) => {
	const submission = await parseWithZod(formDate, {
		schema: onboardingSchema.transform(async data => {
			// redirect user to /login if they are not logged in (or session expired)
			const { user } = await getAuth();
			if (!user) {
				redirect('/login');
			}

			return { ...data, user };
		}),
		async: true,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const { password, user } = submission.value;
	const hashedPassword = await new Argon2id().hash(password);

	await db
		.update(users)
		.set({
			password: hashedPassword,
		})
		.where(eq(users.id, user.id));

	redirect('/');
};

export const passwordLogin = async (prevState: unknown, formDate: FormData) => {
	const submission = await parseWithZod(formDate, {
		schema: passwordLoginSchema.transform(async (data, ctx) => {
			const existingUser = await db.query.users.findFirst({
				where: eq(users.email, data.target),
			});

			if (!existingUser?.password) {
				redirect('/login');
			}

			const isPasswordValid = await new Argon2id().verify(
				existingUser.password,
				data.password,
			);

			if (!isPasswordValid) {
				ctx.addIssue({
					path: ['password'],
					code: z.ZodIssueCode.custom,
					message: 'Incorrect password',
				});
				return z.NEVER;
			}

			return { ...data, user: existingUser };
		}),
		async: true,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const { user } = submission.value;

	const { sessionCookie } = await createSession(user);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);

	redirect('/');
};
