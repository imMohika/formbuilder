'use client';

import {
	useTransition,
	useOptimistic,
	useState,
	useEffect,
	useRef,
	ComponentRef,
} from 'react';
import { useClientHints } from '#components/client-hints';
import { ThemeSwitcherButton } from '#components/theme-switcher-button';
import { flushSync } from 'react-dom';
import { useTheme } from '#components/theme/theme-provider';

export interface ThemeSwitcherProps {
	size?: 'small' | 'big';
}

export function ThemeSwitcher({ size = 'small' }: ThemeSwitcherProps) {
	const [mounted, setMounted] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const ref = useRef<ComponentRef<typeof ThemeSwitcherButton>>(null);
	const toggleWithAnimation = async () => {
		if (!ref.current) return;

		await document.startViewTransition(() => {
			flushSync(() => {
				toggleTheme();
			});
		}).ready;

		const { top, left, width, height } = ref.current.getBoundingClientRect();
		const x = left + width / 2;
		const y = top + height / 2;
		const right = window.innerWidth - left;
		const bottom = window.innerHeight - top;
		const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${maxRadius}px at ${x}px ${y}px)`,
				],
			},
			{
				duration: 500,
				easing: 'ease-in-out',
				pseudoElement: '::view-transition-new(root)',
			},
		);
	};

	const toggle = () => {
		if (
			ref.current &&
			// check https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API#browser_compatibility
			'startViewTransition' in document &&
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			return void toggleWithAnimation();
		}

		toggleTheme();
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		// TODO: add skeleton
		return null;
	}

	return (
		<ThemeSwitcherButton size={size} toggle={toggle} theme={theme} ref={ref} />
	);
}
