import { Separator as AriaSeparator } from 'react-aria-components';
import { cn } from '#ui/utils';
import React from 'react';

const Separator = ({
	className,
	...props
}: React.ComponentProps<typeof AriaSeparator>) => {
	return (
		<AriaSeparator
			className={cn('mx-0.5 my-1 h-0.5 bg-accent', className)}
			{...props}
		/>
	);
};

export { Separator };
