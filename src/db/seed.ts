import { cleanupDb, createUser } from '#tests/db-utils';
import { db } from '#db/index';
import { inviteCodes, users } from '#db/schema/auth';
import { faker } from '@faker-js/faker';

async function seed() {
	console.log('🌱 Seeding...');
	console.time(`🌱 Database has been seeded`);

	console.time('Cleaned up the database...');
	await cleanupDb();
	console.timeEnd('Cleaned up the database...');

	console.time(`Created first user...`);
	const userData = createUser();
	const user = await db
		.insert(users)
		.values({
			email: userData.email,
			slug: userData.slug,
		})
		.returning()
		.then(v => v[0]);
	console.timeEnd(`Created first user...`);

	console.time(`Created first invite code...`);
	const inviteCode = faker.string.nanoid(6);
	console.log(`First invite code is ${inviteCode}`);
	await db.insert(inviteCodes).values({
		code: inviteCode,
		ownerId: user.id,
	});
	console.timeEnd(`Created first invite code...`);

	console.timeEnd(`🌱 Database has been seeded`);
}

seed().catch(e => {
	console.error(e);
	process.exit(1);
});
