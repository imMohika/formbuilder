'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { getClientHints } from '#utils/get-client-hints';
import { clientHints } from '#utils/client-hints';
import { Theme } from '#utils/theme';

type ClientHintsContext = ReturnType<typeof getClientHints> & { theme: string };

type ClientHintsProviderProps = {
	userPreferences: ReturnType<typeof getClientHints>;
	theme: Theme;
	children: React.ReactNode;
};

const Context = React.createContext<ClientHintsContext | null>(null);
export const ClientHintsProvider = ({
	userPreferences,
	theme,
	children,
}: ClientHintsProviderProps) => {
	const prefsMemo = React.useMemo(() => userPreferences, [userPreferences]);
	const value = React.useMemo(
		() => ({
			...prefsMemo,
			theme,
		}),
		[prefsMemo, theme],
	);
	return <Context.Provider value={value}> {children} </Context.Provider>;
};

export const useClientHints = () => {
	const context = React.useContext(Context);

	if (!context) {
		throw new Error(`useClientHints must be used within ClientHintsProvider.`);
	}
	return context;
};

export function ClientHintsCheck({ nonce }: { nonce?: string }) {
	const { refresh } = useRouter();
	React.useEffect(() => {
		const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');

		function handleThemeChange() {
			document.cookie = `${clientHints.colorScheme.cookieName}=${
				themeQuery.matches ? 'dark' : 'light'
			}`;
			refresh();
		}

		themeQuery.addEventListener('change', handleThemeChange);
		return () => {
			themeQuery.removeEventListener('change', handleThemeChange);
		};
	}, [refresh]);

	return (
		<script
			nonce={nonce}
			dangerouslySetInnerHTML={{
				__html: getClientHintCheckScript(),
			}}
		/>
	);
}

function getClientHintCheckScript() {
	return `
const cookies = document.cookie.split(';').map(c => c.trim()).reduce((acc, cur) => {
	const [key, value] = cur.split('=');
	acc[key] = value;
	return acc;
}, {});
let cookieChanged = false;
const hints = [
${Object.values(clientHints)
	.map(hint => {
		const cookieName = JSON.stringify(hint.cookieName);
		return `{ name: ${cookieName}, actual: String(${hint.getValueCode}), cookie: cookies[${cookieName}] }`;
	})
	.join(',\n')}
];
for (const hint of hints) {
	if (decodeURIComponent(hint.cookie) !== hint.actual) {
		cookieChanged = true;
		document.cookie = encodeURIComponent(hint.name) + '=' + encodeURIComponent(hint.actual) + '; Max-Age=31536000; path=/';
	}
}
// if the cookie changed, reload the page, unless the browser doesn't support
// cookies (in which case we would enter an infinite loop of reloads)
if (cookieChanged && navigator.cookieEnabled) {
	window.location.reload();
}
			`;
}
