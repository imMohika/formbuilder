'use client';

import { useTransition } from 'react';
import { setTheme } from '#utils/theme';
import { useClientHints } from '#components/client-hints';
import { Button } from '#components/ui/button';
import { Icon } from '#components/icons';

export function ThemeSwitcher() {
	const { theme } = useClientHints();
	const [_, startTransition] = useTransition();

	const toggle = () => {
		startTransition(async () => {
			await setTheme(theme === 'dark' ? 'light' : 'dark');
		});
	};

	return (
		<Button variant={'ghost'} size={'icon'} onPress={() => toggle()}>
			<Icon
				name={'sun'}
				className="rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0"
				size={'md'}
			/>
			<Icon
				name={'moon'}
				className="absolute rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100"
				size={'md'}
			/>
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
