'use client';

import { User } from 'lucia';
import { ThemeSwitcher } from '#components/theme-switcher';
import Link from 'next/link';
import { buttonVariants } from '#components/ui/button/button';
import { cn } from '#ui/utils';
import { usePathname } from 'next/navigation';
import { UserAccount } from '#app/dashboard/_components/user-account';

const navItems = [
	{
		title: 'Forms',
		href: '/dashboard/forms',
	},
	{
		title: 'Settings',
		href: '/dashboard/settings',
	},
];

export const Header = async ({ user }: { user: User }) => {
	const path = usePathname();
	return (
		<header className="container z-40 flex items-center gap-4 border-0 border-b border-border bg-background py-2">
			<p
				className={
					'flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-mono text-sm text-background'
				}
			>
				FB
			</p>
			<nav className={'flex flex-1 gap-2'}>
				{navItems.map(({ title, href }) => (
					<Link
						key={href}
						href={href}
						className={cn(
							buttonVariants({ variant: 'ghost' }),
							path === href && 'bg-accent',
						)}
					>
						{title}
					</Link>
				))}
			</nav>
			<div className={'flex items-center justify-center gap-4'}>
				<ThemeSwitcher />
				<UserAccount user={user} />
			</div>
		</header>
	);
};
