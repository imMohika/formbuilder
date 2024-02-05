import React from 'react';
import {
	FieldError,
	TextField as AriaTextField,
	TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';
import { Input } from '#components/ui/input';

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
