import Link from 'next/link';
import { cn } from '#ui/utils';
import { buttonVariants } from '#components/ui/button/button';
import { ThemeSwitcher } from '#components/theme-switcher';
import React from 'react';

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
				{`< Back to Home`}
			</Link>

			<div className={'absolute right-2 top-2'}>
				<ThemeSwitcher />
			</div>
			<div
				className={
					'relative flex min-h-full w-full max-w-lg items-center justify-center px-4 py-32'
				}
			>
				<div
					className={
						'absolute left-0 top-0 h-full w-0.5 -translate-x-full bg-gradient-to-b from-transparent via-border to-transparent'
					}
				/>
				{children}
				<div
					className={
						'absolute right-0 top-0 h-full w-0.5 translate-x-full bg-gradient-to-b from-transparent via-border to-transparent'
					}
				/>
			</div>
		</div>
	);
}
