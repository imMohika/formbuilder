import React from 'react';
import { Footer } from './_components/footer';
import { Header } from './_components/header';

export default async function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
