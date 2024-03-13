import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '#ui/utils';
import { ReactNode } from 'react';

const buttonVariants = cva(
	[
		'inline-flex relative isolate items-center justify-center whitespace-nowrap gap-x-2 rounded-lg  font-medium transition-colors',
		'outline-none focus-visible:ring-1 focus-visible:ring-ring',
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
				lg: 'h-10 px-6',
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
		VariantProps<typeof buttonVariants> {
	children?: ReactNode;
	unstyled?: boolean;
	leftSection?: ReactNode;
	rightSection?: ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			leftSection,
			rightSection,
			unstyled = false,
			variant,
			size,
			...props
		},
		ref,
	) => {
		return (
			<AriaButton
				className={cn(
					unstyled
						? className
						: buttonVariants({
								variant,
								size,
								className,
							}),
				)}
				ref={ref}
				{...props}
			>
				{leftSection}
				{children}
				{rightSection}
			</AriaButton>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };

const buttonGroupVariants = cva(['flex gap-0'], {
	variants: {
		orientation: {
			horizontal:
				'flex-row [&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none',
			vertical:
				'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none',
		},
		outline: {
			false: '',
			true: '*:border-input *:border-2',
		},
	},
	compoundVariants: [
		{
			outline: true,
			orientation: 'horizontal',
			className:
				'[&>*:last-child]:!border-e-2 [&>*:first-child]:!border-s-2 [&>*:nth-child(even)]:border-x-0 ',
		},
		{
			outline: true,
			orientation: 'vertical',
			className:
				'[&>*:last-child]:!border-b-2 [&>*:first-child]:!border-t-2 [&>*:nth-child(even)]:border-y-0 ',
		},
	],
	defaultVariants: {
		orientation: 'horizontal',
		outline: false,
	},
});

export interface ButtonGroupProps
	extends VariantProps<typeof buttonGroupVariants> {
	className?: string;
	children: React.ReactNode;
}

const ButtonGroup = ({
	className,
	orientation,
	outline,
	children,
}: ButtonGroupProps) => {
	return (
		<div
			className={cn(buttonGroupVariants({ orientation, outline }), className)}
		>
			{children}
		</div>
	);
};
export { ButtonGroup };
