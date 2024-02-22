'use client';

import { useFormState } from 'react-dom';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Form, PasswordField } from '#components/forms';
import { Button } from '#components/ui/button/button';
import { passwordLoginSchema } from '#app/(auth)/schema';
import { passwordLogin } from '#app/(auth)/actions';
import React from 'react';

export const PasswordLoginForm = ({ target }: { target: string }) => {
	const [lastResult, action] = useFormState(passwordLogin, undefined);
	const [form, fields] = useForm({
		id: 'password-login-form',
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, {
				schema: passwordLoginSchema,
			});
		},
		constraint: getZodConstraint(passwordLoginSchema),
		shouldRevalidate: 'onBlur',
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
				<PasswordField
					label={'Password'}
					autoComplete={'new-password'}
					autoFocus
					{...getInputProps(fields.password, { type: 'password' })}
				/>

				<input {...getInputProps(fields.target, { type: 'hidden' })} />

				<div>
					<Button type={'submit'}>Login</Button>
					{/* TODO: forgot password */}
				</div>
			</div>
		</Form>
	);
};
