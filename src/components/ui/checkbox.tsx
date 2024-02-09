import React from 'react';
import {
	Checkbox as AriaCheckbox,
	CheckboxProps as AriaCheckboxProps,
	FieldError,
	Label,
} from 'react-aria-components';
import { cn } from '#ui/utils';
import { cva, VariantProps } from 'class-variance-authority';

export const checkboxVariants = cva(
	[
		'relative z-0 me-2 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center overflow-hidden rounded  bg-transparent text-foreground',
		'before:absolute before:inset-0 before:-z-10 before:origin-center before:scale-0 before:bg-accent before:opacity-100 before:transition before:duration-300 before:ease-in-out group-data-[selected=true]:before:scale-100 group-data-[selected=true]:before:opacity-100',
	],
	{
		variants: {
			noBorder: {
				true: '',
				false: 'border-2 border-border',
			},
		},
		defaultVariants: {
			noBorder: false,
		},
	},
);

export interface CheckboxProps
	extends AriaCheckboxProps,
		VariantProps<typeof checkboxVariants> {
	label?: string;
	icon?: React.ReactNode;
}

const CheckIcon = () => {
	return (
		<svg className="h-3 w-3 stroke-current" viewBox="0 0 18 18">
			<polyline
				points="1 9 7 14 15 4"
				fill="none"
				strokeWidth={3}
				strokeDasharray={22}
				className={
					'transition-all duration-300  [stroke-dashoffset:66] group-data-[selected=true]:[stroke-dashoffset:44]'
				}
			/>
		</svg>
	);
};

const Checkbox = React.forwardRef<
	React.ElementRef<typeof AriaCheckbox>,
	CheckboxProps
>(({ children, icon, label, noBorder, ...props }, ref) => {
	return (
		<AriaCheckbox className={'group'} ref={ref} {...props}>
			<div>
				<div className={cn(checkboxVariants({ noBorder }))}>
					{icon ? icon : <CheckIcon />}
				</div>
				{label && (
					<Label className={'relative select-none text-sm text-foreground'}>
						{label}
					</Label>
				)}
			</div>
			<FieldError className={'text-sm text-foreground-destructive'} />
		</AriaCheckbox>
	);
});
Checkbox.displayName = 'Checkbox';
export { Checkbox };
