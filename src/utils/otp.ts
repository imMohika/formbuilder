import { db } from '#db';
import { random } from '#lib/random';
import { VERIFY_CODE_LENGTH } from '#config/constants';
import { verificationCodes } from '#db/schema/auth';
import { createDate } from 'oslo';
import { TimeSpan } from 'lucia';

export async function createOtp(
	userId: string | undefined,
	target: string,
): Promise<string> {
	// TODO: check if otp already sent and is not expired

	const code = random.number(VERIFY_CODE_LENGTH);

	await db.insert(verificationCodes).values({
		code,
		expiresAt: createDate(new TimeSpan(1, 'm')).getTime(), // 5 minutes
		userId,
		target,
	});

	return code;
}
