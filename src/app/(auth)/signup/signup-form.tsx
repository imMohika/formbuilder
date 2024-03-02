'use client';

import { useFormState } from 'react-dom';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { signupSchema } from '#app/(auth)/schema';
import { Button } from '#components/ui/button/button';
import { Form, TextField } from '#components/forms';
import React from 'react';
import { signup } from '#app/(auth)/signup/action';

export interface SignupFormProps {
	target?: string;
	inviteCode?: string | null;
	inviteOnly: boolean;
}

export const SignupForm = ({
	target,
	inviteCode,
	inviteOnly,
}: SignupFormProps) => {
	const [lastResult, action] = useFormState(signup, undefined);
	const [form, fields] = useForm({
		id: 'signup-form',
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: signupSchema });
		},
		constraint: getZodConstraint(signupSchema),
		shouldValidate: 'onBlur',
		defaultValue: {
			email: target,
			inviteCode: inviteCode,
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

				{inviteOnly || inviteCode ? (
					<TextField
						label="Invite Code"
						{...getInputProps(fields.inviteCode, { type: 'text' })}
					/>
				) : (
					<input {...getInputProps(fields.inviteCode, { type: 'hidden' })} />
				)}

				<Button type="submit">Submit</Button>
			</div>
		</Form>
	);
};
