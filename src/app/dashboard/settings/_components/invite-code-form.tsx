'use client';

import { User } from 'lucia';
import { useFormState } from 'react-dom';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { regenerateInviteCode } from '#app/dashboard/settings/actions';
import { regenerateInviteCodeSchema } from '#app/dashboard/settings/schema';
import { ErrorList, Form, TextField } from '#components/forms';
import { StatusButton } from '#components/ui/status-button';
import { CopyButton } from '#components/ui/copy-button';
import * as React from 'react';

export const InviteCodeForm = ({ inviteCode }: { inviteCode?: string }) => {
	const [lastResult, action] = useFormState(regenerateInviteCode, null);
	const [form, fields] = useForm({
		id: 'invite-code-form',
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: regenerateInviteCodeSchema });
		},
		constraint: getZodConstraint(regenerateInviteCodeSchema),
		shouldValidate: 'onBlur',
		defaultValue: {
			oldInviteCode: inviteCode,
		},
	});
	return (
		<Form
			action={action}
			validationErrors={form.allErrors}
			{...getFormProps(form)}
		>
			<div className={'flex justify-between gap-4'}>
				<input {...getInputProps(fields.oldInviteCode, { type: 'hidden' })} />
				<div>
					<TextField
						label={'Invite Code'}
						isDisabled={true}
						value={inviteCode}
					/>
					<ErrorList errors={form.errors} id={form.errorId} />
				</div>

				<div className={'flex gap-2'}>
					{inviteCode ? <CopyButton value={inviteCode} /> : null}
					<StatusButton type={'submit'} formStatus={form.status} size={'sm'}>
						{inviteCode ? 'Regenerate' : 'Generate'}
					</StatusButton>
				</div>
			</div>
		</Form>
	);
};
