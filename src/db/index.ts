import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ url: 'file:./db.sqlite' });

import { titles } from './schema/title';

const schema = {
	titles,
};

export const db = drizzle(client, {
	schema,
});
