import Link from 'next/link';
import React from 'react';
import { Footer } from '#app/(site)/_components/footer';
import { cn } from '#ui/utils';

export default async function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="container z-40 flex h-20 items-center justify-between bg-background py-6">
				<p
					className={
						'flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-mono text-sm text-background'
					}
				>
					FB
				</p>
				<Link href="/login" className={cn('px-4')}>
					Login
				</Link>
			</header>
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
