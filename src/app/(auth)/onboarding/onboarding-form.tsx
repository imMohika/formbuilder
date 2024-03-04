'use client';
import { useFormState } from 'react-dom';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import {
	CheckboxField,
	ErrorList,
	Form,
	PasswordField,
} from '#components/forms';
import { onboardingSchema } from '#app/(auth)/schema';
import PasswordStrength from '#components/ui/password-strength';
import React from 'react';
import { onboarding } from '#app/(auth)/onboarding/action';
import { StatusButton } from '#components/ui/status-button';

export const OnboardingForm = () => {
	const [lastResult, action] = useFormState(onboarding, undefined);
	const [form, fields] = useForm({
		id: 'onboarding-form',
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, {
				schema: onboardingSchema,
			});
		},
		constraint: getZodConstraint(onboardingSchema),
		shouldRevalidate: 'onBlur',
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

				<PasswordStrength password={fields.password.value} />

				<CheckboxField
					label={'Do you agree to our Terms of Service and Privacy Policy?'}
					{...getInputProps(fields.agreeToTOSAndPrivacyPolicy, {
						type: 'checkbox',
					})}
				/>

				<ErrorList errors={form.errors} id={form.errorId} />

				<StatusButton type={'submit'} formStatus={form.status}>
					Update
				</StatusButton>
			</div>
		</Form>
	);
};
