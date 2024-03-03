import { faker } from '@faker-js/faker';
import { HttpResponse, http, type HttpHandler } from 'msw';
import { createFixture, requireHeader } from './utils';
import { z } from 'zod';

const { json } = HttpResponse;

export const resendHandlers: Array<HttpHandler> = [
	http.post(`https://api.resend.com/emails`, async ({ request }) => {
		requireHeader(request.headers, 'Authorization');
		const body = await request.json();
		console.info('🔶 mocked email contents:', body);

		const email = await writeEmail(body);

		return json({
			id: faker.string.uuid(),
			from: email.from,
			to: email.to,
			created_at: new Date().toISOString(),
		});
	}),
];

export const EmailSchema = z.object({
	to: z.string(),
	from: z.string(),
	subject: z.string(),
	text: z.string(),
	html: z.string(),
});

export async function writeEmail(rawEmail: unknown) {
	const email = EmailSchema.parse(rawEmail);
	await createFixture('email', email.to, email);
	return email;
}
