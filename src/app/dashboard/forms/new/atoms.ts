import { atomWithReset, atomWithStorage } from 'jotai/utils';

export const atomFormData = atomWithReset({
	title: '',
});
