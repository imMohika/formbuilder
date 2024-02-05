import {
	sqliteTable,
	text,
	integer,
	uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { random } from '#lib/random';
import { titles } from '#db/schema/title';

export const users = sqliteTable(
	'users',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => random.string()),
		email: text('email').unique().notNull(),
	},
	user => ({
		userEmail: uniqueIndex('user_email').on(user.email),
	}),
);

export const usersRelations = relations(users, ({ many }) => ({
	session: many(sessions),
	verificationCode: many(verificationCodes),
	titles: many(titles),
}));

export type User = typeof users.$inferSelect;

export const sessions = sqliteTable('sessions', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => random.string()),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
	expiresAt: integer('expires_at').notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));

export const verificationCodes = sqliteTable('verification_codes', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => random.string()),
	code: text('code'),
	userId: text('user_id').references(() => users.id, {
		onUpdate: 'cascade',
		onDelete: 'cascade',
	}),
	target: text('target').notNull(),
	isUsed: integer('is_used', { mode: 'boolean' }).default(false),
	expiresAt: integer('expires_at').notNull(),
});

export const verificationCodesRelations = relations(
	verificationCodes,
	({ one }) => ({
		user: one(users, {
			fields: [verificationCodes.userId],
			references: [users.id],
		}),
	}),
);