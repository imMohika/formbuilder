'use server';

import { requireUser } from '#lib/auth';
import { parseWithZod } from '@conform-to/zod';
import { createFormSchema } from '#app/dashboard/forms/new/schema';
import { db } from '#db';
import { forms, formShortUrls } from '#db/schema/forms';
import { random } from '#lib/random';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createForm = async (prevState: unknown, formDate: FormData) => {
	const user = await requireUser();

	const submission = await parseWithZod(formDate, {
		schema: createFormSchema,
		async: true,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const { title } = submission.value;

	const formSlug = random.string(6);

	const newForm = await db
		.insert(forms)
		.values({
			title,
			ownerId: user.id,
			slug: formSlug,
		})
		.returning()
		.then(v => v[0]);

	await db.insert(formShortUrls).values({
		slug: formSlug,
		formId: newForm.id,
	});

	revalidatePath('/dashboard/forms');
	redirect('/dashboard/forms');
};
