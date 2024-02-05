import { Lucia } from 'lucia';

import { db } from '#db';
import { users, sessions } from '#db/schema/auth';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { cookies } from 'next/headers';
import React from 'react';
import { redirect } from 'next/navigation';

const adapter = new DrizzleSQLiteAdapter(
	// @ts-expect-error
	db,
	sessions,
	users,
);

export const auth = new Lucia(adapter, {
	getUserAttributes: (user: any) => ({
		email: user.email,
	}),
	sessionCookie: {
		// sets cookies with super long expiration since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages.
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === 'production',
		},
	},
});

export type Auth = typeof auth;

declare module 'lucia' {
	interface Register {
		Lucia: Auth;
		DatabaseUserAttributes: {
			email: string;
		};
	}
}

export const uncachedGetAuth = async () => {
	const sessionId = cookies().get(auth.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return {
			user: null,
			session: null,
		};
	}

	const { user, session } = await auth.validateSession(sessionId);
	try {
		if (session && session.fresh) {
			const sessionCookie = auth.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
		if (!session) {
			const sessionCookie = auth.createBlankSessionCookie();
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page.
	}

	return { user, session };
};

export const getAuth = React.cache(uncachedGetAuth);

export const requireAnonymous = async (redirectTo = '/') => {
	const { user } = await getAuth();
	if (user && user.id) {
		throw redirect(redirectTo);
	}
};
