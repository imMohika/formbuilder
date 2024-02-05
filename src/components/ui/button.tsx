import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '#ui/utils';

const buttonVariants = cva(
	[
		'inline-flex relative isolate items-center justify-center whitespace-nowrap gap-x-2 rounded-lg  font-medium transition-colors',
		'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
		'disabled:pointer-events-none disabled:opacity-50',
	],
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
					'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
				ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 underline hover:decoration-wavy',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 text-sm px-3',
				lg: 'h-10 px-8',
				icon: 'h-9 w-9',
				none: '',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ComponentProps<typeof AriaButton>,
		VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<AriaButton
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
