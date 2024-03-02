'use server';
import { z } from 'zod';
import { ReactElement } from 'react';
import { renderAsync } from '@react-email/components';
import { env } from '#utils/env';

const resendErrorSchema = z.union([
	z.object({
		name: z.string(),
		message: z.string(),
		statusCode: z.number(),
	}),
	z.object({
		name: z.literal('UnknownError'),
		message: z.literal('Unknown Error'),
		statusCode: z.literal(500),
		cause: z.any(),
	}),
]);
type ResendError = z.infer<typeof resendErrorSchema>;

const resendSuccessSchema = z.object({
	id: z.string(),
});

export type SendEmailArgs = {
	to: string;
	subject: string;
} & (
	| { html: string; text: string; react?: never }
	| { react: ReactElement; html?: never; text?: never }
);

export async function sendEmail({ react, ...options }: SendEmailArgs) {
	const from = env.RESEND_FROM;

	const email = {
		from,
		...options,
		...(react ? await renderReactEmail(react) : null),
	};

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		body: JSON.stringify(email),
		headers: {
			Authorization: `Bearer ${env.RESEND_API_KEY}`,
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();

	const parsedData = resendSuccessSchema.safeParse(data);

	if (response.ok && parsedData.success) {
		return {
			status: 'success',
			data: parsedData,
		} as const;
	}

	const parseResult = resendErrorSchema.safeParse(data);
	if (parseResult.success) {
		return {
			status: 'error',
			error: parseResult.data,
		} as const;
	}

	return {
		status: 'error',
		error: {
			name: 'UnknownError',
			message: 'Unknown Error',
			statusCode: 500,
			cause: data,
		} satisfies ResendError,
	} as const;
}

async function renderReactEmail(react: ReactElement) {
	const [html, text] = await Promise.all([
		renderAsync(react),
		renderAsync(react, { plainText: true }),
	]);
	return { html, text };
}
