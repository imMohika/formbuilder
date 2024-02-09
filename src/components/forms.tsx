import React from 'react';
import {
	CheckboxGroup,
	FieldError,
	TextField as AriaTextField,
	TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';
import { Input } from '#components/ui/input';
import { Checkbox, CheckboxProps } from '#components/ui/checkbox';
import { PasswordInput } from '#components/ui/password-input';

export { Form } from 'react-aria-components';

export interface TextFieldProps extends AriaTextFieldProps {
	label?: string;
	description?: string;
}

export const TextField = ({ label, description, ...props }: TextFieldProps) => {
	return (
		<AriaTextField {...props}>
			<Input label={label} description={description} />
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
