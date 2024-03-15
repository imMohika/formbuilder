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
import { getClientHints } from '#utils/get-client-hints';
import { iconsSprite } from '#components/icons';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider, useTheme } from '#components/theme/theme-provider';
import { getTheme } from '#components/theme/utils';
import { getServerTheme } from '#components/theme/actions';

export { metadata } from '#config/site';

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userPreferences = getClientHints();
	const serverTheme = await getServerTheme();
	const theme = serverTheme || userPreferences.colorScheme;

	return (
		<JotaiProvider>
			<html lang="en" className={`${theme}`}>
				<head>
					<ClientHintsCheck />
					<link
						rel="preload"
						as="image"
						type="image/svg+xml"
						href={iconsSprite.src}
					/>
				</head>
				<body
					className={cn(
						'min-h-screen bg-background font-sans text-foreground antialiased',
						fontSans.variable,
						fontMono.variable,
					)}
				>
					<ClientHintsProvider userPreferences={userPreferences} theme={theme}>
						<ThemeProvider defaultTheme={theme}>
							{children}
							<TailwindIndicator />
						</ThemeProvider>
					</ClientHintsProvider>
				</body>
			</html>
		</JotaiProvider>
	);
}
