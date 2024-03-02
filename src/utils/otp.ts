import { random } from '#lib/random';
import { VERIFY_CODE_LENGTH } from '#config/constants';
import { verificationCodes, VerificationCodeType } from '#db/schema/auth';
import { db } from '#db';
import { createDate } from 'oslo';
import { TimeSpan } from 'lucia';

export async function createOtp(): Promise<string> {
	return random.number(VERIFY_CODE_LENGTH);
}

export async function saveOtp(
	code: string,
	userId: string | null,
	target: string,
	type: VerificationCodeType,
) {
	const values = {
		code,
		expiresAt: createDate(new TimeSpan(1, 'm')).getTime(), // 5 minutes
		userId,
		target,
		type,
	};

	await db.insert(verificationCodes).values(values).onConflictDoUpdate({
		target: verificationCodes.target,
		set: values,
	});

	// TODO: send otp to email

	console.log({
		type,
		target,
		code,
	});
}
