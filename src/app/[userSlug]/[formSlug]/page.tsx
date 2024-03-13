import { db } from '#db';
import { and, eq } from 'drizzle-orm';
import { users } from '#db/schema/auth';
import { forms } from '#db/schema/forms';
import { notFound } from 'next/navigation';

export default async function FormView({
	params,
}: {
	params: {
		userSlug: string;
		formSlug: string;
	};
}) {
	const owner = await db.query.users.findFirst({
		where: eq(users.slug, params.userSlug),
	});
	if (!owner) {
		return notFound();
	}

	const form = await db.query.forms.findFirst({
		where: and(eq(forms.ownerId, owner.id), eq(forms.slug, params.formSlug)),
	});
	if (!form) {
		return notFound();
	}

	return (
		<div>
			<p className={'text-body-lg font-bold'}>{form.title}</p>
		</div>
	);
}
