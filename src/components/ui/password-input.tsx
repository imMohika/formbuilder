import { forwardRef, useState } from 'react';
import * as React from 'react';
import { Input, InputProps } from '#components/ui/input';
import { Icon } from '#components/icons';
import { Button } from '#components/ui/button/button';

export interface PasswordInputProps extends InputProps {}

const PasswordInput = forwardRef<
	React.ElementRef<typeof Input>,
	PasswordInputProps
>(({ type, ...props }, ref) => {
	const [isVisible, setVisible] = useState(false);
	const rightSide = (
		<Button
			type="button"
			variant={'ghost'}
			size={'icon'}
			onPress={() => setVisible(curr => !isVisible)}
			className={'group'}
			data-visible={isVisible}
		>
			<Icon
				name={'eye-closed'}
				className="transition-all duration-200 group-data-[visible=true]:opacity-0"
				size={'md'}
			/>
			<Icon
				name={'eye-open'}
				className="absolute opacity-0 transition-all duration-200 group-data-[visible=true]:opacity-100"
				size={'md'}
			/>
		</Button>
	);
	return (
		<Input
			type={isVisible ? 'text' : 'password'}
			rightSide={rightSide}
			{...props}
		/>
	);
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
