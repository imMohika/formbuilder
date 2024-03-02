'use server';

import { parseWithZod } from '@conform-to/zod';
import { loginSchema } from '#app/(auth)/schema';
import { redirect } from 'next/navigation';
import { db } from '#db';
import { eq } from 'drizzle-orm';
import { users } from '#db/schema/auth';
import { z } from 'zod';
import { Argon2id } from 'oslo/password';
import { createSession } from '#app/(auth)/utils';
import { cookies } from 'next/headers';

export const login = async (prevState: unknown, formDate: FormData) => {
	const submission = await parseWithZod(formDate, {
		schema: loginSchema.transform(async (data, ctx) => {
			const genericError = {
				path: ['password'],
				code: z.ZodIssueCode.custom,
				message: 'Incorrect email or password',
			};
			const existingUser = await db.query.users.findFirst({
				where: eq(users.email, data.email),
			});

			if (!existingUser?.password) {
				ctx.addIssue(genericError);
				return z.NEVER;
			}

			const isPasswordValid = await new Argon2id().verify(
				existingUser.password,
				data.password,
			);

			if (!isPasswordValid) {
				ctx.addIssue(genericError);
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
