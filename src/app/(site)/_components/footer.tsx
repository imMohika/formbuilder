import * as React from 'react';
import { cn } from '#ui/utils';
import { siteConfig } from '#config/site';

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
	return (
		<footer className={cn(className)}>
			<div className="container flex flex-col items-center justify-between gap-4 py-10 md:flex-row md:py-0">
				<div className="flex flex-col items-center gap-2 px-2 md:flex-row md:gap-2 md:px-0">
					<p
						className={
							'flex h-6 w-6 items-center justify-center rounded-full bg-foreground font-mono text-xs text-background'
						}
					>
						FB
					</p>
					<p className="text-center text-sm leading-loose md:text-left">
						Built by{' '}
						<a
							href={'https://im.mohika.ir'}
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4"
						>
							immohika
						</a>
						. The source code is available on{' '}
						<a
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4"
						>
							GitHub
						</a>
						.
					</p>
				</div>
			</div>
		</footer>
	);
}
