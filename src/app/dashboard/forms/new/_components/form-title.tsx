'use client';

import { TextField } from '#components/forms';
import { useAtom } from 'jotai';
import { atomFormData } from '../atoms';

export const FormTitle = () => {
	const [formData, setFormData] = useAtom(atomFormData);
	return (
		<TextField
			label={'Title'}
			inputProps={{
				labelPosition: 'outside-left',
			}}
			value={formData.title}
			onChange={title => setFormData(curr => ({ ...curr, title }))}
		/>
	);
};
