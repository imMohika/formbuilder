'use server';

import { auth, getAuth } from '#lib/auth';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export const logout = async () => {
	const { session } = await getAuth();

	if (session) {
		await auth.invalidateSession(session.id);
		cookies().delete('auth_session');
	}

	revalidatePath('/', 'layout');
};
