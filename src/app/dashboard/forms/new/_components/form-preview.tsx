import { useAtomValue } from 'jotai';
import { atomFormData } from '../atoms';
import { ThemeSwitcherButton } from '#components/theme-switcher-button';
import { useState } from 'react';
import { cn } from '#ui/utils';

export const FormPreview = () => {
	const formData = useAtomValue(atomFormData);
	const [formTheme, setFormTheme] = useState('light');
	const toggleFormTheme = () => {
		setFormTheme(curr => (curr === 'dark' ? 'light' : 'dark'));
	};
	return (
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

					<ThemeSwitcherButton toggle={toggleFormTheme} theme={formTheme} />
				</div>
			</div>
		</div>
	);
};
