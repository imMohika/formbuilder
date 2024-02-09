import { useState, useEffect, useDeferredValue } from 'react';
import { ZxcvbnResult } from '@zxcvbn-ts/core';
import { zxcvbn } from '#lib/zxcvbn';
import { Progress } from '#components/ui/progress';

const usePasswordStrength = (password: string) => {
	const [result, setResult] = useState<ZxcvbnResult | null>(null);
	const deferredPassword = useDeferredValue(password);

	useEffect(() => {
		zxcvbn(deferredPassword).then(res => setResult(res));
	}, [deferredPassword]);

	return result;
};

export interface PasswordStrengthProps {
	password?: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
	const result = usePasswordStrength(password ?? '');
	return (
		<Progress
			minValue={0}
			maxValue={4}
			value={result?.score}
			valueLabel={([value, min, max]) => `${value ?? min}/${max}`}
			segments={4}
			label={'Password strength'}
		/>
	);
}
