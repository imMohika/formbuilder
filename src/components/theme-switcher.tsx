'use client';

import { useTransition } from 'react';
import { setTheme } from '#utils/theme';
import { useClientHints } from '#components/client-hints';
import { ThemeSwitcherButton } from '#components/theme-switcher-button';

export interface ThemeSwitcherProps {
	size?: 'small' | 'big';
}

export function ThemeSwitcher({ size = 'small' }: ThemeSwitcherProps) {
	const { theme } = useClientHints();
	const [_, startTransition] = useTransition();

	const toggle = () => {
		startTransition(async () => {
			await setTheme(theme === 'dark' ? 'light' : 'dark');
		});
	};

	return <ThemeSwitcherButton size={size} toggle={toggle} theme={theme} />;
}
