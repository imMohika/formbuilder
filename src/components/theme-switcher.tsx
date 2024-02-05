'use client';

import { useTransition } from 'react';
import { setTheme } from '#utils/theme';
import { useClientHints } from '#components/client-hints';
import { Button } from '#components/ui/button';

export function ThemeSwitcher() {
	const { theme } = useClientHints();
	const [_, startTransition] = useTransition();

	const toggle = () => {
		startTransition(async () => {
			await setTheme(theme === 'dark' ? 'light' : 'dark');
		});
	};

	return (
		<Button variant={'ghost'} onPress={() => toggle()}>
			Theme: {theme}
		</Button>
	);
}
