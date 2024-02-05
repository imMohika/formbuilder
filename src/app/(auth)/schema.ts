import { z } from 'zod';
import { VERIFY_CODE_LENGTH } from '#config/constants';

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email('Email is invalid'),
	intent: z.enum(['request-code', 'verify-code']),
});

export const verifySchema = z.object({
	code: z
		.string({ required_error: 'Code is required' })
		.length(
			VERIFY_CODE_LENGTH,
			`Code must be ${VERIFY_CODE_LENGTH}-digits long`,
		),
	target: z.string(),
});
