import Link from 'next/link';
import { cn } from '#ui/utils';
import { buttonVariants } from '#components/ui/button';
import { ThemeSwitcher } from '#components/theme-switcher';
import { requireAnonymous } from '#lib/auth';
import React from 'react';

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireAnonymous();

	return (
		<div
			className={
				'container relative flex h-screen w-screen flex-col items-center justify-center'
			}
		>
			<Link
				href={'/'}
				className={cn(
					buttonVariants({ variant: 'link' }),
					'absolute left-2 top-2 md:left-4 md:top-4',
				)}
			>
				{`< Back`}
			</Link>

			<div className={'absolute right-2 top-2'}>
				<ThemeSwitcher />
			</div>
			<div className={'flex w-1/2 justify-center'}>
				<div
					className={
						'flex w-full flex-col  gap-4 rounded-lg border border-border p-12'
					}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
