import { db } from '#db';
export default async function Home() {
	const lastTitle = await db.query.titles.findFirst();
	return <main>last title: {lastTitle?.title}</main>;
}
