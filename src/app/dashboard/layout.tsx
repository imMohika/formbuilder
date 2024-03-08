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
		<div>
			<Header user={user} />
			<div>
				<main className={'p-4'}>{children}</main>
			</div>
		</div>
	);
}
