import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const zBool = z
	.string()
	.refine(s => s === 'true' || s === 'false')
	.transform(s => s === 'true');

export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		NODE_ENV: z.enum(['production', 'development', 'test']),
		INVITE_ONLY: zBool,
		DB_URL: z.string().url(),
		DB_TOKEN: z.string().optional(),
		RESEND_FROM: z.string().email(),
		RESEND_API_KEY: z.string(),
		DISABLE_MOCKS: zBool.optional().default('false'),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		INVITE_ONLY: process.env.INVITE_ONLY,
		DB_URL: process.env.DB_URL,
		DB_TOKEN: process.env.DB_TOKEN,
		RESEND_FROM: process.env.RESEND_FROM,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		DISABLE_MOCKS: process.env.DISABLE_MOCKS,
	},

	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
	 * useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	/**
	 * Makes it so that empty strings are treated as undefined.
	 * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
	 */
	emptyStringAsUndefined: true,
});
