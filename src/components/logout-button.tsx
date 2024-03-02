'use client';

import { Button } from '#components/ui/button/button';
import React, { useTransition } from 'react';
import { Icon } from '#components/icons';
import { logout } from '#app/(auth)/logout/action';

export interface LogoutButtonProps extends React.ComponentProps<typeof Button> {
	iconOnly?: boolean;
}

export const LogoutButton = ({
	onPress,
	iconOnly = false,
	...props
}: LogoutButtonProps) => {
	const [isPending, startTransition] = useTransition();
	return (
		<Button
			size={iconOnly ? 'icon' : 'default'}
			onPress={e => {
				if (isPending) return;
				startTransition(async () => {
					await logout();
				});
				if (onPress) onPress(e);
			}}
			{...props}
		>
			<Icon name={'exit'} />
			{!iconOnly && 'Logout'}
		</Button>
	);
};
