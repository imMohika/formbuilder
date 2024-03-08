'use client';

import * as React from 'react';
import { Button, ButtonProps } from '#components/ui/button/button';
import { Icon } from '#components/icons';
import { cn } from '#ui/utils';
import { useFormStatus } from 'react-dom';

export const StatusButton = React.forwardRef<
	HTMLButtonElement,
	ButtonProps & {
		formStatus: 'success' | 'error' | undefined;
	}
>(({ formStatus, isDisabled, children, ...props }, ref) => {
	const { pending } = useFormStatus();

	const companion = {
		pending: (
			<div className="inline-flex h-6 w-6 items-center justify-center">
				<Icon name="update" className="animate-spin" />
			</div>
		),
		success: (
			<div className="inline-flex h-6 w-6 items-center justify-center">
				<Icon name="check" />
			</div>
		),
		error: (
			<div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive">
				<Icon name="cross-1" className="text-destructive-foreground" />
			</div>
		),
		idle: null,
	}[pending ? 'pending' : formStatus ?? 'idle'];

	return (
		<Button ref={ref} isDisabled={pending || isDisabled} {...props}>
			{children}
			{companion}
		</Button>
	);
});
StatusButton.displayName = 'StatusButton';
