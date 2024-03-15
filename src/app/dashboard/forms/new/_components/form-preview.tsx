'use client';

import { useAtomValue } from 'jotai';
import { atomFormData } from '../atoms';
import { useState } from 'react';
import { cn } from '#ui/utils';
import { ThemeSwitcher } from '#components/theme-switcher';
import {
	BaseThemeProvider,
	ThemeProvider,
} from '#components/theme/theme-provider';
import { Theme } from '#components/theme/utils';

export const FormPreview = () => {
	const formData = useAtomValue(atomFormData);
	const [formTheme, setFormTheme] = useState<Theme>('light');
	const toggleFormTheme = () => {
		setFormTheme(curr => (curr === 'dark' ? 'light' : 'dark'));
	};
	return (
		<BaseThemeProvider
			theme={formTheme}
			toggleTheme={toggleFormTheme}
			setTheme={() => {}}
		>
			<div
				className={cn(
					formTheme === 'dark' ? 'dark' : 'light',
					'relative h-full w-full rounded-lg border border-border bg-background text-foreground',
				)}
			>
				<div className={'p-8'}>
					<div className={'flex justify-between gap-4'}>
						<p className={'text-body-md font-semibold capitalize'}>
							{formData.title ? formData.title : 'Form Title'}
						</p>

						<ThemeSwitcher />
					</div>
				</div>
			</div>
		</BaseThemeProvider>
	);
};
