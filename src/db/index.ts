import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export const client = createClient({ url: 'file:./db.sqlite' });

import * as schema from './schema';

export const db = drizzle(client, {
	schema,
});
