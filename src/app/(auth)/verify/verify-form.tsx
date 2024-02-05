'use client';

import { useFormState } from 'react-dom';
import { verify } from '#app/(auth)/actions';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { verifySchema } from '#app/(auth)/schema';
import { Button, buttonVariants } from '#components/ui/button';
import { Form, TextField } from '#components/forms';
import Link from 'next/link';

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

				<div>
					<Button type={'submit'}>Verify</Button>
					<Link
						href={{
							pathname: '/login',
							search: `target=${encodeURIComponent(target)}`,
						}}
						className={buttonVariants({ variant: 'link' })}
					>
						Resend Code
					</Link>
				</div>
			</div>
		</Form>
	);
};
