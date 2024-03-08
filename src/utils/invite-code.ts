'use server';

import { getCookieValue } from '#utils/get-cookie-value';
import { inviteCodeCookie } from '#utils/cookies';
import { cookies } from 'next/headers';
import { db } from '#db';
import { eq } from 'drizzle-orm';
import { inviteCodes } from '#db/schema/auth';
import { random } from '#lib/random';

export const getInviteCodeId = () => {
	return getCookieValue(inviteCodeCookie.cookieName);
};

export async function setInviteCodeId(inviteCode: string | null) {
	if (!inviteCode || inviteCode === '') {
		cookies().delete(inviteCodeCookie.cookieName);
	} else {
		cookies().set(inviteCodeCookie.cookieName, inviteCode);
	}
}

export const createUniqueInviteCode = async () => {
	while (true) {
		const randomInviteCode = random.string(6);

		const existing = await db.query.inviteCodes.findFirst({
			where: eq(inviteCodes.code, randomInviteCode),
		});

		if (!existing) {
			return randomInviteCode;
		}
	}
};
