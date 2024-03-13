'use client';
import { useFormState } from 'react-dom';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Form } from '#components/forms';
import { StatusButton } from '#components/ui/status-button';
import { createForm } from '#app/dashboard/forms/new/actions';
import { createFormSchema } from '#app/dashboard/forms/new/schema';
import { useAtom } from 'jotai';
import { atomFormData } from '../atoms';
import { RESET } from 'jotai/utils';

export const CreateFormForm = () => {
	const [formData, setFormData] = useAtom(atomFormData);
	const [lastResult, action] = useFormState(createForm, null);
	const [form, fields] = useForm({
		id: 'create-form-form',
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: createFormSchema });
		},
		onSubmit(event, ctx) {
			if (ctx.submission?.status === 'success') {
				setFormData(RESET);
			}
		},
		constraint: getZodConstraint(createFormSchema),
		shouldValidate: 'onBlur',
	});

	return (
		<Form
			action={action}
			validationErrors={form.allErrors}
			{...getFormProps(form)}
		>
			<input
				{...getInputProps(fields.title, {
					type: 'hidden',
				})}
				value={formData.title}
			/>

			<StatusButton type={'submit'} formStatus={form.status}>
				Create
			</StatusButton>
		</Form>
	);
};
