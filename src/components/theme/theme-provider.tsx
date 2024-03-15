'use client';

import React, { ReactNode, useState, useTransition } from 'react';
import { getTheme, Theme, themes } from '#components/theme/utils';
import { saveTheme } from '#components/theme/actions';
import { themeCookie } from '#utils/cookies';

export interface UseThemeProps {
	setTheme: (newTheme: Theme) => void;
	toggleTheme: () => void;
	theme: string;
}

export interface ThemeProviderProps {
	defaultTheme?: Theme;
	cookieName?: string;
	children: ReactNode;
}

export interface BaseThemeProviderProps {
	defaultTheme?: Theme;
	theme: Theme;
	setTheme: (newTheme: Theme) => void;
	toggleTheme: () => void;
	children: ReactNode;
}

const Context = React.createContext<UseThemeProps | undefined>(undefined);

export const useTheme = () => {
	const context = React.useContext(Context);

	if (!context) {
		throw new Error(`useTheme must be used within ThemeProvider.`);
	}
	return context;
};

export function ThemeProvider({
	children,
	cookieName = themeCookie.cookieName,
	defaultTheme = themes[0],
}: ThemeProviderProps) {
	const [theme, setThemeState] = useState(() =>
		getTheme(cookieName, defaultTheme),
	);

	const [_, startTransition] = useTransition();
	const systemThemes = ['light', 'dark'];

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);

		document.documentElement.classList.remove(...themes);
		document.documentElement.classList.add(newTheme);

		if (systemThemes.includes(newTheme)) {
			document.documentElement.style.colorScheme = newTheme;
		}

		startTransition(async () => {
			await saveTheme(newTheme, cookieName);
		});
	};

	const toggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
	};

	return (
		<BaseThemeProvider
			setTheme={setTheme}
			theme={theme}
			toggleTheme={toggleTheme}
		>
			{children}
		</BaseThemeProvider>
	);
}

export function BaseThemeProvider({
	children,
	setTheme,
	toggleTheme,
	theme,
}: BaseThemeProviderProps) {
	const value = React.useMemo(
		() => ({
			theme,
			setTheme,
			toggleTheme,
			themes,
		}),
		[theme, setTheme, themes],
	);

	return <Context.Provider value={value}>{children}</Context.Provider>;
}
