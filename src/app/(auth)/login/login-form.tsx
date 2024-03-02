'use client';

import { useFormState } from 'react-dom';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { loginSchema } from '#app/(auth)/schema';
import { Button, buttonVariants } from '#components/ui/button/button';
import {
	CheckboxField,
	Form,
	PasswordField,
	TextField,
} from '#components/forms';
import React from 'react';
import Link from 'next/link';
import { login } from '#app/(auth)/login/action';

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
					{...getInputProps(fields.email, { type: 'email' })}
				/>

				<PasswordField
					label={'Password'}
					autoComplete={'new-password'}
					{...getInputProps(fields.password, { type: 'password' })}
				/>

				<div className={'flex justify-between'}>
					{/* TODO*/}
					<CheckboxField label={'Remember me'} isDisabled />
					<Link
						className={buttonVariants({ variant: 'ghost', size: 'sm' })}
						href={'/forgor-password'}
					>
						Forgot password?
					</Link>
				</div>

				<Button type="submit" name="intent" value="request-code">
					Login
				</Button>
			</div>
		</Form>
	);
};
