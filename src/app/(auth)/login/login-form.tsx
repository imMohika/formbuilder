'use client';

import { useFormState } from 'react-dom';
import { login } from '#app/(auth)/actions';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { loginSchema } from '#app/(auth)/schema';
import { Button } from '#components/ui/button/button';
import { Form, TextField } from '#components/forms';

export const LoginForm = ({ target }: { target?: string }) => {
	const [lastResult, action] = useFormState(login, undefined);
	const [form, fields] = useForm({
		id: 'login-form',
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: loginSchema });
		},
		constraint: getZodConstraint(loginSchema),
		shouldValidate: 'onBlur',
		defaultValue: {
			email: target,
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
					label="Email"
					autoComplete="email"
					autoFocus
					{...getInputProps(fields.email, { type: 'email' })}
				/>
				<div>
					<Button type="submit" name="intent" value="request-code">
						Login
					</Button>
					<Button
						type="submit"
						variant={'link'}
						name={'intent'}
						value={'verify-code'}
					>
						Already have a code?
					</Button>
				</div>
			</div>
		</Form>
	);
};
