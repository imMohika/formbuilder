import type { Config } from 'drizzle-kit';
import { env } from '#utils/env';

export default {
	schema: './src/db/schema',
	out: './drizzle',
	driver: 'turso',
	dbCredentials: {
		url: env.DB_URL,
		authToken: env.DB_TOKEN,
	},
} satisfies Config;
