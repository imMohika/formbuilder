import { useState } from 'react';

export const useClipboard = ({ timeout = 2500 } = {}) => {
	const [error, setError] = useState<Error | null>(null);
	const [copied, setCopied] = useState(false);
	const [timeoutId, setTimeoutId] = useState<number | null>(null);

	const handleResult = (val: boolean) => {
		if (timeoutId) {
			window.clearTimeout(timeoutId);
		}

		setTimeoutId(window.setTimeout(() => setCopied(false), timeout));
		setCopied(val);
	};

	const copy = (val: any) => {
		if ('clipboard' in navigator) {
			navigator.clipboard
				.writeText(val)
				.then(() => handleResult(true))
				.catch(e => {
					throw e;
				});
		} else {
			setError(new Error('useClipboard: navigator.clipboard is not supported'));
		}
	};

	return { copy, error, copied };
};
