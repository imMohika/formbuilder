import { requireUser } from '#lib/auth';
import React from 'react';
import { Header } from './_components/header';

export const metadata = {
	title: 'Dashboard',
};

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await requireUser();

	return (
		<div className={'flex h-screen w-full flex-col gap-4'}>
			<Header user={user} />
			<main className={'flex-1 px-4'}>{children}</main>
		</div>
	);
}
