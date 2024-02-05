import { db } from '#db';
import { CreateTitleForm } from '#app/(site)/_components/create-title';
import { desc } from 'drizzle-orm';
import { Title, titles } from '#db/schema/title';
import { User } from '#db/schema/auth';
import React from 'react';

export default async function Home() {
	const lastTitle = await db.query.titles.findFirst({
		orderBy: desc(titles.createdAt),
		with: {
			user: true,
		},
	});

	return (
		<main className={'flex flex-col items-center justify-center gap-4'}>
			<LastTitle data={lastTitle} user={lastTitle?.user} />

			<CreateTitleForm />
		</main>
	);
}

const LastTitle = ({ data, user }: { data?: Title; user?: User | null }) => {
	if (!data) {
		return <p>No Title</p>;
	}
	return (
		<div>
			<p>last title: {data.title}</p>
			{user && <p> - user: {user.email} </p>}
		</div>
	);
};
