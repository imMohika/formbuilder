'use client';

import { useTransition } from 'react';
import { setTheme } from '#utils/theme';
import { useClientHints } from '#components/client-hints';

export function ThemeSwitcher() {
	const { theme } = useClientHints();
	const [_, startTransition] = useTransition();

	const toggle = () => {
		startTransition(async () => {
			await setTheme(theme === 'dark' ? 'light' : 'dark');
		});
	};

	return <button onClick={() => toggle()}>Theme: {theme}</button>;
}
