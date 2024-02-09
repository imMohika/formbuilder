'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Input as AriaInput, Label, Text } from 'react-aria-components';

const baseVariants = cva('flex w-full gap-2', {
	variants: {
		labelPosition: {
			'outside-left': 'flex-row',
			'outside-right': 'flex-row-reverse',
			'outside-top': 'flex-col',
			'inside-top': '',
			'inside-bottom': '',
		},
	},
	defaultVariants: {
		labelPosition: 'outside-top',
	},
});

const mainWrapperVariants = cva('flex h-full flex-1 flex-col', {
	variants: {},
});

const inputWrapperVariants = cva(
	'relative inline-flex items-center justify-center h-10 min-h-10 w-full rounded-md overflow-hidden border border-border bg-accent/80 shadow-sm transition-all hover:border-accent hover:bg-accent focus-visible:border-accent',
	{
		variants: {
			labelPosition: {
				'outside-left': '',
				'outside-right': '',
				'outside-top': '',
				'inside-top': 'h-14',
				'inside-bottom': 'h-14',
			},
		},
		defaultVariants: {
			labelPosition: 'outside-top',
		},
	},
);

const innerWrapperVariants = cva(
	'inline-flex h-full w-full flex-1items-center',
	{
		variants: {},
	},
);
const inputVariants = cva(
	'h-full w-full bg-transparent px-3 font-normal !outline-none placeholder:text-muted-foreground dark:[color-scheme:dark]',
	{
		variants: {
			labelPosition: {
				'outside-left': '',
				'outside-right': '',
				'outside-top': '',
				'inside-top': 'pt-4',
				'inside-bottom': 'pb-4',
			},
			hasRight: {
				true: 'pe-10',
				false: '',
			},
		},
		defaultVariants: {
			labelPosition: 'outside-top',
		},
	},
);

export const labelVariants = cva(
	'relative block text-foreground will-change-auto',
	{
		variants: {
			labelPosition: {
				'outside-left': 'pt-2',
				'outside-right': 'pt-2',
				'outside-top': '',
				'inside-top': 'text-xs font-medium !absolute top-1 left-2',
				'inside-bottom': 'text-xs font-medium !absolute bottom-1 left-2',
			},
		},
		defaultVariants: {
			labelPosition: 'outside-top',
		},
	},
);

const descriptionVariants = cva('ps-2 pt-2 text-xs text-muted-foreground', {
	variants: {},
});

export interface InputProps
	extends Omit<React.ComponentProps<typeof AriaInput>, 'size'>,
		VariantProps<typeof inputWrapperVariants>,
		VariantProps<typeof inputVariants>,
		VariantProps<typeof labelVariants> {
	label?: string;
	description?: string;
	rightSide?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, label, description, type, labelPosition, rightSide, ...props },
		ref,
	) => {
		const labelContent = !label ? null : (
			<Label className={labelVariants({ labelPosition })}>{label}</Label>
		);

		const isLabelInside =
			labelPosition === 'inside-bottom' || labelPosition === 'inside-top';

		const hasRight = Boolean(rightSide);
		return (
			// base
			<div className={baseVariants({ labelPosition })}>
				{!isLabelInside && labelContent}
				{/*main wrapper*/}
				<div className={mainWrapperVariants({})}>
					{/*input wrapper*/}
					<div className={inputWrapperVariants({ labelPosition })}>
						{isLabelInside && labelContent}
						{/*inner wrapper*/}
						<div className={innerWrapperVariants({})}>
							<AriaInput
								className={inputVariants({ labelPosition, hasRight })}
								type={type}
								ref={ref}
								{...props}
							/>
						</div>
						{hasRight && <div className={'absolute right-2'}>{rightSide}</div>}
					</div>
					{description && (
						<Text slot={'description'} className={descriptionVariants({})}>
							{description}
						</Text>
					)}
				</div>
			</div>
		);
	},
);
Input.displayName = 'Input';

export { Input };
