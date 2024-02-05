'use client';
import { Button } from '#components/ui/button';
import { logout } from '#app/(auth)/actions';
import { useTransition } from 'react';

export const LogoutButton = () => {
	const [isPending, startTransition] = useTransition();
	return (
		<Button
			variant={'ghost'}
			onPress={() => {
				if (isPending) return;
				startTransition(async () => {
					await logout();
				});
			}}
		>
			Logout
		</Button>
	);
};
