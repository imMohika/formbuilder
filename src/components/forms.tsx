import React from 'react';
import {
	CheckboxGroup,
	FieldError,
	TextField as AriaTextField,
	TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';
import { Input, InputProps } from '#components/ui/input';
import { Checkbox, CheckboxProps } from '#components/ui/checkbox';
import { PasswordInput } from '#components/ui/password-input';

export { Form } from 'react-aria-components';

export interface TextFieldProps extends AriaTextFieldProps {
	label?: string;
	description?: string;
	inputProps?: InputProps;
}

export const TextField = ({
	label,
	description,
	inputProps,
	...props
}: TextFieldProps) => {
	return (
		<AriaTextField {...props}>
			<Input label={label} description={description} {...inputProps} />
			<FieldError className={'text-sm text-foreground-destructive'} />
		</AriaTextField>
	);
};

export const PasswordField = ({
	label,
	description,
	...props
}: TextFieldProps) => {
	return (
		<AriaTextField {...props}>
			<PasswordInput label={label} description={description} />
			<FieldError className={'text-sm text-foreground-destructive'} />
		</AriaTextField>
	);
};

export const CheckboxField = ({ ...props }: CheckboxProps) => {
	return (
		<CheckboxGroup name={props.name}>
			<Checkbox {...props} />
		</CheckboxGroup>
	);
};

export type ListOfErrors = Array<string | null | undefined> | null | undefined;

export function ErrorList({
	id,
	errors,
}: {
	errors?: ListOfErrors;
	id?: string;
}) {
	const errorsToRender = errors?.filter(Boolean);
	if (!errorsToRender?.length) return null;
	return (
		<ul id={id} className="flex flex-col gap-1">
			{errorsToRender.map(e => (
				<li key={e} className="text-sm text-foreground-destructive">
					{e}
				</li>
			))}
		</ul>
	);
}
