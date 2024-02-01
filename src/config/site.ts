import { Metadata } from 'next';

export const siteConfig = {
	links: {
		github: '#',
	},
};
export const metadata = {
	title: 'Form Builder',
	description: 'Create survey forms easily',
	keywords: ['form', 'survey', 'Next.js', 'React'],
	applicationName: 'Form Builder',
	authors: [
		{
			name: 'immohika',
			url: 'https://im.mohika.ir',
		},
	],
	creator: 'immohika',
} as const satisfies Metadata;
