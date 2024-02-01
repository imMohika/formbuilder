import type { Viewport } from 'next';
import './globals.css';
import { cn } from '#ui/utils';
import { fontMono, fontSans } from '#ui/fonts';
import { TailwindIndicator } from '#components/tailwind-indicator';
import React from 'react';
import {
	ClientHintsCheck,
	ClientHintsProvider,
} from '#components/client-hints';
import { getTheme } from '#utils/theme';
import { getClientHints } from '#utils/get-client-hints';
import { clientHints } from '#utils/client-hints';

export { metadata } from '#config/site';

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userPreferences = getClientHints();
	const theme = getTheme() || userPreferences.colorScheme;

	return (
		<html lang="en" className={`${theme}`}>
			<head>
				<ClientHintsCheck />
			</head>
			<body
				className={cn(
					'min-h-screen bg-background font-sans text-foreground antialiased',
					fontSans.variable,
					fontMono.variable,
				)}
			>
				<ClientHintsProvider userPreferences={userPreferences} theme={theme}>
					{children}
					<TailwindIndicator />
				</ClientHintsProvider>
			</body>
		</html>
	);
}
