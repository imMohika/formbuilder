import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@storybook/addon-interactions',
		'@storybook/addon-themes',
		'@storybook/themes',
		'@storybook/addon-actions',
		'@storybook/addon-a11y',
		'@storybook/addon-measure',
		'@storybook/addon-outline',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	staticDirs: [
		{
			from: '../node_modules/geist/dist/fonts/geist-sans',
			to: '/fonts/geist-sans',
		},
		{
			from: '../node_modules/geist/dist/fonts/geist-mono',
			to: '/fonts/geist-mono',
		},
	],
};
export default config;
