import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { random } from '#lib/random';

export const titles = sqliteTable('titles', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => random.string(6)),
	title: text('title').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }),
});
