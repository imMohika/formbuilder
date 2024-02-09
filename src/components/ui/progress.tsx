import React, { ReactNode, useMemo } from 'react';
import {
	Label,
	ProgressBar as AriaProgress,
	ProgressBarProps as AriaProgressProps,
} from 'react-aria-components';
import { cn } from '#ui/utils';

export interface ProgressProps extends Omit<AriaProgressProps, 'valueLabel'> {
	label?: string;
	valueLabel?: ReactNode | (([value, min, max]: Array<number>) => ReactNode);
	segments?: number;
}

const Progress = React.forwardRef<
	React.ElementRef<typeof AriaProgress>,
	ProgressProps
>(
	(
		{
			label,
			segments = 1,
			valueLabel,
			className,
			value,
			minValue = 0,
			maxValue = 100,
			...props
		},
		ref,
	) => {
		const valueNode = useMemo(() => {
			if (typeof valueLabel === 'function') {
				return valueLabel([value ? value : minValue, minValue, maxValue]);
			}

			return valueLabel;
		}, [valueLabel, value, minValue, maxValue]);

		const segmentsArr = useMemo(
			() => Array.from({ length: segments }),
			[segments],
		);
		const eachSegmentWidth =
			segments === 1 ? 100 : (100 / segments) * (maxValue / segments);

		return (
			<AriaProgress
				className={cn('flex w-full flex-col gap-1 text-foreground', className)}
				valueLabel={valueNode}
				value={value}
				minValue={minValue}
				maxValue={maxValue}
				ref={ref}
				{...props}
			>
				{({ percentage, valueText }) => (
					<>
						<div className={'flex'}>
							<Label className={'flex-1'}>{label}</Label>
							<span className="value">{valueText}</span>
						</div>
						<div className="relative flex h-1 w-full gap-2 overflow-hidden rounded-full">
							{segmentsArr.map((_, i) => (
								<div
									className={'relative overflow-hidden bg-accent'}
									style={{
										width: eachSegmentWidth + '%',
									}}
									key={`segment-${i}`}
								>
									<div
										className={cn(
											'absolute h-full rounded-full bg-primary transition-all',
										)}
										style={{
											width: `${
												segments === 1
													? percentage
													: (value ?? minValue) > i
														? 100
														: 0
											}%`,
										}}
									/>
								</div>
							))}
						</div>
					</>
				)}
			</AriaProgress>
		);
	},
);

Progress.displayName = 'Progress';
export { Progress };
