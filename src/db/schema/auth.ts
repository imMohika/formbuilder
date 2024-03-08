import {
	sqliteTable,
	text,
	integer,
	uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import { random } from '#lib/random';
import { titles } from '#db/schema/title';

export const users = sqliteTable(
	'users',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => random.string()),
		email: text('email').unique().notNull(),
		password: text('password'),

		invitedById: text('invited_by_id'),
		slug: text('slug').notNull(),
	},
	user => ({
		userEmail: uniqueIndex('user_email').on(user.email),
	}),
);

export const usersRelations = relations(users, ({ one, many }) => ({
	session: many(sessions),
	verificationCode: many(verificationCodes),
	titles: many(titles),
	inviteCodeOwner: many(inviteCodes, {
		relationName: 'invite_code_owner',
	}),
	invitedBy: one(inviteCodes, {
		fields: [users.invitedById],
		references: [inviteCodes.id],
		relationName: 'invite_code_invitee',
	}),
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

export const verificationCodeTypes = [
	'onboarding',
	'reset-password',
	'signup',
	'change-email',
	'2fa',
] as const;
export type VerificationCodeType = (typeof verificationCodeTypes)[number];

export const verificationCodes = sqliteTable('verification_codes', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => random.string()),
	userId: text('user_id').references(() => users.id, {
		onUpdate: 'cascade',
		onDelete: 'cascade',
	}),

	code: text('code'),
	target: text('target').notNull().unique(),
	type: text('type', { enum: verificationCodeTypes }).notNull(),

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

export const inviteCodes = sqliteTable('invite_codes', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => random.string()),

	code: text('code').unique().notNull(),
	isRevoked: integer('is_revoked', { mode: 'boolean' }).default(false),
	ownerId: text('owner_id')
		.notNull()
		.references(() => users.id),

	createdAt: integer('created_at', { mode: 'timestamp' })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
});

export const inviteCodesRelations = relations(inviteCodes, ({ one, many }) => ({
	owner: one(users, {
		fields: [inviteCodes.ownerId],
		references: [users.id],
		relationName: 'invite_code_owner',
	}),
	invitees: many(users, {
		relationName: 'invite_code_invitee',
	}),
}));
