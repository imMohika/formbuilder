'use client';

import { Progress } from '#components/ui/progress';
import React, { useState } from 'react';
import { Button } from '#components/ui/button/button';

export const ProgressTest = () => {
	const [progress, setProgress] = useState(0);

	const inc = () => {
		setProgress(curr => {
			const num = curr + 1;
			if (curr > 4) return 0;
			return num;
		});
	};

	return (
		<div className={'flex w-1/2 flex-col gap-4'}>
			<Progress
				label={'Label'}
				valueLabel={([value, min, max]) => `${value ?? min}/${max}`}
				value={progress}
				minValue={0}
				maxValue={4}
			/>

			<Progress
				label={'Label'}
				valueLabel={([value, min, max]) => `${value ?? min}/${max}`}
				value={progress}
				maxValue={4}
				segments={4}
			/>

			<Button type={'button'} onPress={() => inc()}>
				meow
			</Button>
		</div>
	);
};
