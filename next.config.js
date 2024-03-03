/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 */
await import('#utils/env.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		instrumentationHook: true,
	},
	webpack: (config, { isServer }) => {
		// Prevent dependencies from the getting bundled
		config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');

		// check https://github.com/mswjs/examples/pull/101#discussion_r1462254400
		if (isServer) {
			if (Array.isArray(config.resolve.alias)) {
				config.resolve.alias.push({ name: 'msw/browser', alias: false });
			} else {
				config.resolve.alias['msw/browser'] = false;
			}
		} else {
			if (Array.isArray(config.resolve.alias)) {
				config.resolve.alias.push({ name: 'msw/node', alias: false });
			} else {
				config.resolve.alias['msw/node'] = false;
			}
		}

		return config;
	},
};

export default nextConfig;
