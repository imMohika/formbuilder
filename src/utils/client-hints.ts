export type ClientHint<Value> = {
	cookieName: string;
	getValueCode: string;
	fallback: Value;
	transform?: (value: string) => Value;
};

export const colorScheme = {
	cookieName: 'ch-prefers-color-scheme',
	getValueCode: `window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'`,
	fallback: 'light',
	transform(value: string) {
		return value === 'dark' ? 'dark' : 'light';
	},
} as const satisfies ClientHint<'dark' | 'light'>;

export const timeZone = {
	cookieName: 'ch-time-zone',
	getValueCode: `Intl.DateTimeFormat().resolvedOptions().timeZone`,
	fallback: 'UTC',
} as const satisfies ClientHint<string>;

export const clientHints = {
	colorScheme,
	timeZone,
};

export type ClientHints = keyof typeof clientHints;
