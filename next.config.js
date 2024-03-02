/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 */
await import('#utils/env.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: config => {
		config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
		return config;
	},
	reactStrictMode: true,
};

export default nextConfig;
