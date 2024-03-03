import { sql } from 'drizzle-orm';
import { db } from '#db';
import { faker } from '@faker-js/faker';
import { UniqueEnforcer } from 'enforce-unique';

const uniqueEmailEnforcer = new UniqueEnforcer();

export function createUser() {
	const email = uniqueEmailEnforcer
		.enforce(() => faker.internet.email())
		.toLowerCase()
		.replace(/[^a-z0-9_]/g, '_');
	return { email };
}

export async function cleanupDb() {
	if (process.env.NODE_ENV === 'production') return;

	const tableSchema = db._.schema;
	if (!tableSchema) throw new Error('No table schema found');

	const names = Object.values(tableSchema).map(table => table.dbName);

	// Disable FK constraints to avoid relation conflicts during deletion
	await db.run(sql`PRAGMA foreign_keys = OFF`);
	await db.transaction(async tx => {
		// Delete all rows from each table, preserving table structures
		await Promise.all(
			names.map(async name => {
				await tx.run(sql.raw(`DELETE from "${name}"`));
			}),
		);
	});
	await db.run(sql`PRAGMA foreign_keys = ON`);
}
