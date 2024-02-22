'use client';

import { useTransition } from 'react';
import { setTheme } from '#utils/theme';
import { useClientHints } from '#components/client-hints';
import { Button } from '#components/ui/button/button';
import { Icon } from '#components/icons';

export function ThemeSwitcher({ size = 'small' }: { size?: 'small' | 'big' }) {
	const { theme } = useClientHints();
	const [_, startTransition] = useTransition();

	const toggle = () => {
		startTransition(async () => {
			await setTheme(theme === 'dark' ? 'light' : 'dark');
		});
	};

	return (
		<Button
			variant={'ghost'}
			size={size === 'small' ? 'icon' : 'default'}
			onPress={() => toggle()}
		>
			{size === 'big' && <p>{theme}</p>}
			<div className={'relative'}>
				<Icon
					name={'sun'}
					className="rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0"
					size={'md'}
				/>
				<Icon
					name={'moon'}
					className="absolute left-0 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100"
					size={'md'}
				/>
			</div>
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
