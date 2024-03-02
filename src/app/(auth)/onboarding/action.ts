'use server';

import { parseWithZod } from '@conform-to/zod';
import { onboardingSchema } from '#app/(auth)/schema';
import { getAuth } from '#lib/auth';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { db } from '#db';
import { users } from '#db/schema/auth';
import { eq } from 'drizzle-orm';
import { createSession, getUser } from '#app/(auth)/utils';
import { cookies } from 'next/headers';

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

export const handleOnboardingVerification = async (
	target: string,
	userId: string | null,
) => {
	const user = await getUser(target, userId);
	if (!user) {
		// TODO: better error handling
		throw new Error("User doesn't exist");
	}
	const { sessionCookie } = await createSession(user);
	cookies().set(sessionCookie);

	return redirect('/');
};