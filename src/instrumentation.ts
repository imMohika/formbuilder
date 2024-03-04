import { env } from '#utils/env';

export async function register() {
	if (
		process.env.NEXT_RUNTIME === 'nodejs' &&
		process.env.NODE_ENV !== 'production' &&
		process.env.DISABLE_MOCKS !== 'true'
	) {
		console.log('NODE ENV: ', process.env.NODE_ENV);
		const { server } = await import('#/tests/mocks/msw');

		server.listen({ onUnhandledRequest: 'warn' });
		if (process.env.NODE_ENV !== 'test') {
			console.info('🔶 Mock server installed');
		}
	}
}
