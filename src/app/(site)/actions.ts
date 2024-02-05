'use server';
import { parseWithZod } from '@conform-to/zod';
import { db } from '#db';
import { titles } from '#db/schema/title';
import { createTitleSchema } from '#app/(site)/schema';
import { revalidatePath } from 'next/cache';
import { getAuth } from '#lib/auth';

export const createTitle = async (prevState: unknown, formDate: FormData) => {
	const submission = await parseWithZod(formDate, {
		schema: createTitleSchema,
		async: true,
	});

	if (submission.status !== 'success') {
		return submission.reply();
	}

	const { title } = submission.value;
	const { user } = await getAuth();

	await db.insert(titles).values({
		title,
		userId: user?.id,
	});

	revalidatePath('/');
};
