import type { Meta, StoryObj } from '@storybook/react';
import { Button, buttonVariants } from '#components/ui/button/button';
import { action } from '@storybook/addon-actions';
import { Icon } from '#components/icons';
import { VisuallyHidden } from 'react-aria';

const meta = {
	title: 'Button',
	component: Button,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {
		onPress: action('clicked'),
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Default',
	},
};

export const Variants: Story = {
	render: ({ onPress }) => (
		<div className={'flex gap-2'}>
			<Button onPress={onPress}>default</Button>
			<Button variant={'destructive'} onPress={onPress}>
				destructive
			</Button>
			<Button variant={'ghost'} onPress={onPress}>
				ghost
			</Button>
			<Button variant={'outline'} onPress={onPress}>
				outline
			</Button>
			<Button variant={'link'} onPress={onPress}>
				link
			</Button>
		</div>
	),
};

export const Sizes: Story = {
	render: ({ onPress, variant }) => (
		<div className={'flex gap-2'}>
			<Button size={'default'} onPress={onPress} variant={variant}>
				default
			</Button>
			<Button size={'lg'} onPress={onPress} variant={variant}>
				LG
			</Button>
			<Button size={'sm'} onPress={onPress} variant={variant}>
				SM
			</Button>
			<Button size={'icon'} onPress={onPress} variant={variant}>
				<VisuallyHidden>Sun</VisuallyHidden>
				<Icon name={'sun'} />
			</Button>
			<Button size={'none'} onPress={onPress} variant={variant}>
				none
			</Button>
		</div>
	),
};

export const Unstyled: Story = {
	args: {
		unstyled: true,
		children: 'Unstyled',
	},
};
