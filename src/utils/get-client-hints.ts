import { getCookieValue } from '#utils/get-cookie-value';
import { ClientHint, ClientHints, clientHints } from '#utils/client-hints';

export type ClientHintsValue<ClientHintsRecord> = {
	[K in keyof ClientHintsRecord]: ClientHintsRecord[K] extends ClientHint<
		infer Value
	>
		? ClientHintsRecord[K]['transform'] extends (value: string) => Value
			? ReturnType<ClientHintsRecord[K]['transform']>
			: ClientHintsRecord[K]['fallback']
		: never;
};

export function getClientHints() {
	return Object.entries(clientHints).reduce(
		(acc, [name, hint]) => {
			const hintName = name as ClientHints;
			const cookieName = clientHints[hintName].cookieName;

			if (!cookieName) {
				throw new Error(`Unknown user preferences cookie: ${hintName}`);
			}

			if ('transform' in hint) {
				// @ts-expect-error
				acc[hintName] = hint.transform(
					getCookieValue(cookieName) ?? hint.fallback,
				);
			} else {
				// @ts-expect-error
				acc[hintName] = getCookieValue(cookieName) ?? hint.fallback;
			}

			return acc;
		},
		{} as ClientHintsValue<typeof clientHints>,
	);
}
