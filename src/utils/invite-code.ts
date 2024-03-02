'use server';

import { getCookieValue } from '#utils/get-cookie-value';
import { inviteCodeCookie } from '#utils/cookies';
import { cookies } from 'next/headers';

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
