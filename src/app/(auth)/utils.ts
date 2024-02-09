import { db } from '#db';
import { eq } from 'drizzle-orm';
import { User, users } from '#db/schema/auth';
import { auth } from '#lib/auth';

export const getUser = async (email: string, userId?: string | null) => {
	if (userId) {
		return db.query.users.findFirst({
			where: eq(users.id, userId),
		});
	}

	return db.query.users.findFirst({
		where: eq(users.email, email),
	});
};

export const createUser = async (email: string) => {
	const newUser = await db
		.insert(users)
		.values({
			email,
		})
		.returning()
		.then(t => t[0]);

	if (!newUser) {
		throw new Error('failed to createUser');
	}

	console.log('Created new user', { newUser });
	return newUser;
};

export const createSession = async (user: User) => {
	// TODO: add session info like browser and login time
	const session = await auth.createSession(user.id, {});
	const sessionCookie = auth.createSessionCookie(session.id);

	return { session, sessionCookie };
};
