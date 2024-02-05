import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { random } from '#lib/random';
import { users } from '#db/schema/auth';

export const titles = sqliteTable('titles', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => random.string()),
	title: text('title').notNull(),
	userId: text('user_id').references(() => users.id, {
		onUpdate: 'cascade',
		onDelete: 'cascade',
	}),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

export const titleRelations = relations(titles, ({ one }) => ({
	user: one(users, {
		fields: [titles.userId],
		references: [users.id],
	}),
}));

export type Title = typeof titles.$inferSelect;
