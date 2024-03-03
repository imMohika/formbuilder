export async function register() {
	if (process.env.NEXT_RUNTIME === 'nodejs') {
		const { server } = await import('#/tests/mocks/msw');

		server.listen({ onUnhandledRequest: 'warn' });
		if (process.env.NODE_ENV !== 'test') {
			console.info('🔶 Mock server installed');
		}
	}
}
