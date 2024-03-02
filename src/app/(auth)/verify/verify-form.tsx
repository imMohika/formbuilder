'use client';

import { useFormState } from 'react-dom';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { verifySchema } from '#app/(auth)/schema';
import { Button } from '#components/ui/button/button';
import { Form, TextField } from '#components/forms';
import { verify } from '#app/(auth)/verify/action';

export const VerifyForm = ({ target }: { target: string }) => {
	const [lastResult, action] = useFormState(verify, undefined);
	const [form, fields] = useForm({
		id: 'verify-form',
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: verifySchema });
		},
		constraint: getZodConstraint(verifySchema),
		shouldValidate: 'onBlur',
		defaultValue: {
			target,
		},
	});

	return (
		<Form
			action={action}
			validationErrors={form.allErrors}
			{...getFormProps(form)}
		>
			<div className={'flex flex-col gap-4'}>
				<TextField
					label="Code"
					autoComplete="one-time-code"
					autoFocus
					{...getInputProps(fields.code, { type: 'text' })}
				/>

				<input {...getInputProps(fields.target, { type: 'hidden' })} />

				<Button type={'submit'}>Verify</Button>
			</div>
		</Form>
	);
};
