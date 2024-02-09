import type { Config } from 'tailwindcss';
import { extendedTheme } from '#config/tailwind';
import animatePlugin from 'tailwindcss-animate';
import reactAria from 'tailwindcss-react-aria-components';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/ui/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx,svg}',
	],
	darkMode: ['class'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: extendedTheme,
	},
	plugins: [reactAria, animatePlugin],
};
export default config;
