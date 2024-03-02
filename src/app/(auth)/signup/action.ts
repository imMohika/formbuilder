'use server';

import { parseWithZod } from '@conform-to/zod';
import { signupSchema } from '#app/(auth)/schema';
import { env } from '#utils/env';
import { z } from 'zod';
import { db } from '#db';
import { and, eq } from 'drizzle-orm';
import { inviteCodes, users } from '#db/schema/auth';
import { createOtp, saveOtp } from '#utils/otp';
import { getBaseUrl } from '#utils/misc';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { setInviteCodeId } from '#utils/invite-code';
import { createSession, createUser } from '#app/(auth)/utils';

export const signup = async (prevState: unknown, formDate: FormData) => {
	const submission = await parseWithZod(formDate, {
		schema: signupSchema.transform(async (data, ctx) => {
			// inviteCode is optional in schema
			// But we need to make it required when env.INVITE_ONLY is on
			if (env.INVITE_ONLY && !data.inviteCode) {
				ctx.addIssue({
					path: ['inviteCode'],
					code: z.ZodIssueCode.custom,
					message: 'Invite code is required',
				});
				return z.NEVER;
			}

			if (data.inviteCode) {
				const savedInviteCode = await db.query.inviteCodes.findFirst({
					where: and(
						eq(inviteCodes.code, data.inviteCode),
						eq(inviteCodes.isRevoked, false),
					),
				});

				if (!savedInviteCode) {
					ctx.addIssue({
						path: ['inviteCode'],
						code: z.ZodIssueCode.custom,
						message: 'Invite code is invalid',
					});
					return z.NEVER;
				}

				return { ...data, inviteCodeId: savedInviteCode.id };
			}

			return { ...data, inviteCodeId: null };
		}),
		async: true,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const { email, inviteCodeId } = submission.value;

	if (inviteCodeId) {
		await setInviteCodeId(inviteCodeId);
	}

	const verifyUrl = new URL(`${getBaseUrl()}/verify`);
	verifyUrl.searchParams.set('target', email);
	verifyUrl.searchParams.set('type', 'signup');

	const otp = await createOtp();

	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, email),
	});

	if (existingUser) {
		// When user already exists, don't show an error message or send otp
		// https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#account-creation
		return redirect(verifyUrl.toString());
	}

	await saveOtp(otp, null, email, 'signup');
	return redirect(verifyUrl.toString());
};

export const handleSignupVerification = async (target: string) => {
	const user = await createUser(target);
	const { sessionCookie } = await createSession(user);
	cookies().set(sessionCookie);

	const url = new URL(`${getBaseUrl()}/onboarding`);
	url.searchParams.set('target', target);
	return redirect(url.toString());
};
