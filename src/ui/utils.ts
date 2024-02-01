import { extendTailwindMerge } from 'tailwind-merge';
import { extendedTheme } from '#config/tailwind';
import { ClassValue, clsx } from 'clsx';

function formatColors() {
	const colors = [];
	for (const [key, color] of Object.entries(extendedTheme.colors)) {
		if (typeof color === 'string') {
			colors.push(key);
		} else {
			const colorGroup = Object.keys(color).map(subKey =>
				subKey === 'DEFAULT' ? '' : subKey,
			);
			colors.push({ [key]: colorGroup });
		}
	}
	return colors;
}

const customTwMerge = extendTailwindMerge<string, string>({
	extend: {
		theme: {
			colors: formatColors(),
			borderRadius: Object.keys(extendedTheme.borderRadius),
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return customTwMerge(clsx(inputs));
}
