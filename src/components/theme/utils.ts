import { themeCookie } from '#utils/cookies';
import { getCookie } from 'cookies-next';

export const themes = ['light', 'dark'] as const;
export type Theme = (typeof themes)[number];

export const systemThemes = ['light', 'dark'];

export const getTheme = (
	cookieName = themeCookie.cookieName,
	fallback: Theme,
) => {
	const value = getCookie(cookieName);
	if (value && themes.includes(value as Theme)) return value as Theme;
	return fallback;
};
