import React from 'react';
import { Button, ButtonProps } from '#components/ui/button/button';
import { useClipboard } from '#hooks/use-clipboard';
import { Icon } from '#components/icons';

export interface CopyButtonProps extends Omit<ButtonProps, 'children'> {
	value: string;
	timeout?: number;
}

const CopyButton = React.forwardRef<
	React.ComponentRef<typeof Button>,
	CopyButtonProps
>(({ timeout = 1000, value, ...props }, ref) => {
	const { copy, copied } = useClipboard({ timeout });
	const icon = (
		<div className="inline-flex h-6 w-6 items-center justify-center">
			<Icon name={copied ? 'check' : 'clipboard-copy'} />
		</div>
	);
	return (
		<Button
			className={'gap-x-0'}
			onPress={() => copy(value)}
			size={'sm'}
			leftSection={icon}
			ref={ref}
		>
			{copied ? 'Copied' : 'Copy'}
		</Button>
	);
});
CopyButton.displayName = 'CopyButton';

export { CopyButton };
