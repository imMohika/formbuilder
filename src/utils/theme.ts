'use server';

import { getCookieValue } from '#utils/get-cookie-value';
import { themeCookie } from '#utils/cookies';
import { cookies } from 'next/headers';

export type Theme = 'light' | 'dark';

export const getTheme = () => {
	const value = getCookieValue(themeCookie.cookieName);
	if (value === 'light' || value === 'dark') return value;
	return null;
};

export async function setTheme(theme: Theme | 'system') {
	'use server';
	const { cookieName } = themeCookie;

	if (theme === 'system') {
		cookies().delete(cookieName);
	} else {
		cookies().set(cookieName, theme);
	}
}
