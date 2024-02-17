import Link from 'next/link';
import { cn } from '#ui/utils';
import React from 'react';
import { getAuth } from '#lib/auth';
import { LogoutButton } from '#components/logout-button';
import { ButtonGroup, buttonVariants } from '#components/ui/button';
import { ThemeSwitcher } from '#components/theme-switcher';
import { Icon } from '#components/icons';

export const Header = async () => {
	const { user } = await getAuth();
	const isLoggedIn = Boolean(user && user.id);
	return (
		<header className="container z-40 flex h-20 items-center justify-between bg-background py-6">
			<p
				className={
					'flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-mono text-sm text-background'
				}
			>
				FB
			</p>

			<div className={'flex items-center justify-center gap-4'}>
				<ThemeSwitcher />
				{isLoggedIn ? (
					<ButtonGroup outline>
						<Link href={'/dashboard'} className={cn(buttonVariants({}))}>
							<Icon name={'dashboard'} />
							Dashboard
						</Link>
						<LogoutButton variant={'outline'} size={'icon'} iconOnly />
					</ButtonGroup>
				) : (
					<Link
						href="/login"
						className={cn(buttonVariants({ variant: 'link' }), cn('px-4'))}
					>
						Login
					</Link>
				)}
			</div>
		</header>
	);
};
