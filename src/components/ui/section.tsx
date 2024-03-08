import React from 'react';
import { cn } from '#ui/utils';

export const Section = ({
	children,
	className,
	...props
}: React.ComponentProps<'section'>) => {
	return (
		<section
			className={cn('w-full rounded-lg border border-border p-4', className)}
			{...props}
		>
			{children}
		</section>
	);
};
