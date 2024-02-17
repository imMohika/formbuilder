'use client';

import React, { forwardRef, ReactNode } from 'react';
import {
	DialogTrigger as AriaDialogTrigger,
	Dialog as AriaDialog,
	Popover,
} from 'react-aria-components';
import { cn } from '#ui/utils';
import { PressHookProps, usePress } from 'react-aria';
import Link, { LinkProps } from 'next/link';
import { Separator } from '#components/ui/separator';

export interface MenuProps
	extends Omit<React.ComponentProps<typeof Popover>, 'children'> {
	children: ReactNode;
}

const Menu = forwardRef<React.ComponentRef<typeof Popover>, MenuProps>(
	({ children, ...props }, ref) => {
		const [trigger, menu] = React.Children.toArray(children);
		return (
			<AriaDialogTrigger>
				{trigger}
				<Popover {...props} ref={ref}>
					{menu}
				</Popover>
			</AriaDialogTrigger>
		);
	},
);
Menu.displayName = 'Menu';
export { Menu };

export interface MenuDropdownProps
	extends React.ComponentProps<typeof AriaDialog> {
	children: ReactNode;
}

const MenuDropdown = React.forwardRef<
	React.ComponentRef<typeof AriaDialog>,
	MenuDropdownProps
>(({ children, className, ...props }, ref) => {
	return (
		<AriaDialog
			className={cn(
				'flex min-w-36 select-none flex-col items-stretch gap-0.5 overflow-auto rounded-lg border border-border bg-popover px-2 py-1.5 text-popover-foreground outline-none',
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</AriaDialog>
	);
});
MenuDropdown.displayName = 'MenuDropdown';
export { MenuDropdown };

export interface MenuItemProps
	extends Omit<React.ComponentProps<'div'>, 'ref'>,
		PressHookProps {
	children: ReactNode;
}

const MenuItem = ({ children, className, ref, ...props }: MenuItemProps) => {
	const { pressProps, isPressed } = usePress({
		...props,
		ref,
	});
	return (
		<div
			{...pressProps}
			className={cn(
				'relative -mx-1 rounded-md border border-transparent px-2 py-1.5 text-base text-foreground outline-none transition-all duration-300',
				'hover:border-border hover:bg-accent hover:text-accent-foreground',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};
MenuItem.displayName = 'MenuItem';
export { MenuItem };

export interface MenuLinkProps extends React.ComponentProps<typeof Link> {}

const MenuLink = ({ children, className, ...props }: MenuLinkProps) => {
	return (
		<Link
			className={cn(
				'relative -mx-1 rounded-md border border-transparent px-2 py-1.5 text-base text-foreground outline-none transition-all duration-300',
				'hover:border-border hover:bg-accent hover:text-accent-foreground',
				className,
			)}
			{...props}
		>
			{children}
		</Link>
	);
};
MenuLink.displayName = 'MenuLink';
export { MenuLink };

export interface MenuSectionProps {
	title: string;
	children?: ReactNode;
	showDivider?: boolean;
}

const MenuSection = ({
	title,
	children,
	showDivider = false,
}: MenuSectionProps) => {
	return (
		<>
			<p className={cn('my-0.5 text-xs text-muted-foreground')}>{title}</p>
			{children}
			{showDivider && <Separator />}
		</>
	);
};
MenuSection.displayName = 'MenuSection';
export { MenuSection };
