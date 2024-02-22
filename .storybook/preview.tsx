import type { Preview } from '@storybook/react';
import '#app/globals.css';

import { withThemeByClassName } from '@storybook/addon-themes';
import { cn } from '#ui/utils';
import localFont from 'next/font/local';

// Workaround for using geist in storybook
// https://github.com/vercel/geist-font/issues/72
const GeistSans = localFont({
	src: '../fonts/geist-sans/Geist-Variable.woff2',
	variable: '--font-geist-sans',
});

const GeistMono = localFont({
	src: '../fonts/geist-mono/GeistMono-Variable.woff2',
	variable: '--font-geist-mono',
});

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: 'centered',
	},

	decorators: [
		Story => (
			<main
				className={cn(
					'font-sans antialiased',
					GeistSans.variable,
					GeistMono.variable,
				)}
			>
				<Story />
			</main>
		),
		withThemeByClassName({
			themes: {
				light: '',
				dark: 'dark',
			},
			defaultTheme: 'light',
		}),
	],
};

export default preview;
