import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export const client = createClient({
	url: env.DB_URL,
	authToken: env.DB_TOKEN,
});

import * as schema from './schema';
import { env } from '#utils/env';

export const db = drizzle(client, {
	schema,
});
