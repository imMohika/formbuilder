'use client';
import { User } from 'lucia';
import { useFormState } from 'react-dom';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { updateSlug } from '#app/dashboard/settings/actions';
import { updateSlugSchema } from '#app/dashboard/settings/schema';
import { ErrorList, Form, TextField } from '#components/forms';
import { StatusButton } from '#components/ui/status-button';

export const SlugForm = ({ user }: { user: User }) => {
	const [lastResult, action] = useFormState(updateSlug, null);
	const [form, fields] = useForm({
		id: 'update-slug-form',
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: updateSlugSchema });
		},
		constraint: getZodConstraint(updateSlugSchema),
		shouldValidate: 'onBlur',
		defaultValue: {
			slug: user.slug,
		},
	});
	const isSlugEdited = fields.slug.dirty;
	return (
		<Form
			action={action}
			validationErrors={form.allErrors}
			{...getFormProps(form)}
		>
			<div className={'flex justify-between gap-4'}>
				<div>
					<TextField
						label="Slug"
						{...getInputProps(fields.slug, { type: 'text' })}
					/>

					<ErrorList errors={form.errors} id={form.errorId} />
				</div>

				<StatusButton
					type={'submit'}
					formStatus={form.status}
					size={'sm'}
					isDisabled={!isSlugEdited}
				>
					Update
				</StatusButton>
			</div>
		</Form>
	);
};
