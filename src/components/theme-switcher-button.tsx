import { Button } from '#components/ui/button/button';
import { Icon } from '#components/icons';

export interface ThemeSwitcherButtonProps {
	size?: 'small' | 'big';
	toggle: () => void;
	theme: string;
}

export const ThemeSwitcherButton = ({
	size = 'small',
	toggle,
	theme,
}: ThemeSwitcherButtonProps) => {
	return (
		<Button
			variant={'ghost'}
			size={size === 'small' ? 'icon' : 'default'}
			onPress={() => toggle()}
			className={'group'}
			data-theme={theme}
		>
			{size === 'big' && <p>{theme}</p>}
			<div className={'relative'}>
				<Icon
					name={'sun'}
					className="rotate-0 scale-100 transition-all duration-500 group-data-[theme='dark']:-rotate-90 group-data-[theme='dark']:scale-0"
					size={'md'}
				/>
				<Icon
					name={'moon'}
					className="absolute left-0 rotate-90 scale-0 transition-all duration-500 group-data-[theme='dark']:rotate-0 group-data-[theme='dark']:scale-100"
					size={'md'}
				/>
			</div>
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
};
