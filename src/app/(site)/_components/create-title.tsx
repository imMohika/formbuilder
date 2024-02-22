'use client';

import { useFormState } from 'react-dom';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { createTitle } from '#app/(site)/actions';
import { createTitleSchema } from '#app/(site)/schema';
import { Button } from '#components/ui/button/button';
import { Form, TextField } from '#components/forms';

export const CreateTitleForm = () => {
	const [lastResult, action] = useFormState(createTitle, undefined);
	const [form, fields] = useForm({
		id: 'create-title-form',
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: createTitleSchema });
		},
		constraint: getZodConstraint(createTitleSchema),
		shouldValidate: 'onBlur',
	});

	return (
		<Form action={action} {...getFormProps(form)}>
			<div className={'flex w-full flex-col items-center justify-center gap-4'}>
				<TextField
					label="Title"
					{...getInputProps(fields.title, { type: 'text' })}
				/>

				<Button type="submit">create</Button>
			</div>
		</Form>
	);
};
