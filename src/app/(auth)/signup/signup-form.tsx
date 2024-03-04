'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { signupSchema } from '#app/(auth)/schema';
import { ErrorList, Form, TextField } from '#components/forms';
import React from 'react';
import { signup } from '#app/(auth)/signup/action';
import { StatusButton } from '#components/ui/status-button';

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

				<ErrorList errors={form.errors} id={form.errorId} />

				<StatusButton type="submit" formStatus={form.status}>
					Submit
				</StatusButton>
			</div>
		</Form>
	);
};
