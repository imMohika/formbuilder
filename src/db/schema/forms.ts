import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { random } from '#lib/random';
import { users } from '#db/schema/auth';
import { relations } from 'drizzle-orm';

export const formStatus = [
	'draft',
	'inProgress',
	'paused',
	'completed',
] as const;

export const forms = sqliteTable('forms', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => random.string()),
	ownerId: text('owner_id')
		.notNull()
		.references(() => users.id),

	title: text('title').notNull(),
	slug: text('slug').notNull(),

	status: text('status', { enum: formStatus }).notNull().default('draft'),

	// compeleteAt (auto complete based on date)
	// usage limit (eg after 100 submits complete form)
	// single use
	// password
	// verifyEmail (user should be logged in to submit the form)

	// form welcome (before submitting the form)
	// enabled, items, showResponseCount, image

	// form finish (after submitting the form)
	// enabled, items, buttonLabel, buttonLink, image,

	// form closed (when form is completed/paused)
	// items, buttonLabel, buttonLink

	// questions
	// redirectTo: text("redirect_to")

	// responses

	// settings (theme, ...)
});

export type Form = typeof forms.$inferSelect;

export const formsRelations = relations(forms, ({ one }) => ({
	shortUrls: one(formShortUrls),
}));

export const formShortUrls = sqliteTable('form_short_urls', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => random.string()),
	formId: text('form_id')
		.notNull()
		.references(() => forms.id, {
			onDelete: 'cascade',
		}),

	slug: text('slug').unique().notNull(),
});
