'use server';
import { cookies } from 'next/headers';
import { Theme, themes } from '#components/theme/utils';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { themeCookie } from '#utils/cookies';

export async function saveTheme(theme: Theme | 'system', cookieName: string) {
	if (theme === 'system') {
		deleteCookie(cookieName, { cookies });
	} else {
		setCookie(cookieName, theme, { cookies });
	}
}

export async function getServerTheme(cookieName = themeCookie.cookieName) {
	const value = getCookie(cookieName, { cookies });
	if (value && themes.includes(value as Theme)) return value as Theme;
	return undefined;
}
