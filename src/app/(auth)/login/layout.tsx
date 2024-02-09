import React from 'react';
import { Metadata } from 'next';
import { requireAnonymous } from '#lib/auth';

export const metadata: Metadata = {
	title: 'Log in',
};

export default async function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireAnonymous();
	return <>{children}</>;
}
