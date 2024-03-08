import { z } from 'zod';
import { VERIFY_CODE_LENGTH } from '#config/constants';
import { inviteCodeSchema, slugSchema } from '#utils/schema';

export const passwordSchema = z
	.string({ required_error: 'Password is required' })
	.min(8, 'Password should be at least 8 characters')
	.max(64, "Password shouldn't be longer than 64 characters");

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email('Email is invalid'),
	password: passwordSchema,
});

export const signupSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email('Email is invalid'),
	inviteCode: inviteCodeSchema.optional(),
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

export const onboardingSchema = z.object({
	password: passwordSchema,
	slug: slugSchema,
	agreeToTOSAndPrivacyPolicy: z.boolean({
		required_error: 'You must agree to the terms of service and privacy policy',
	}),
});
