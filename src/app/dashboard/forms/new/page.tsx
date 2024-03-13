'use client';

import { Button } from '#components/ui/button/button';
import { CreateFormForm } from '#app/dashboard/forms/new/_components/create-form-form';
import { FormPreview } from '#app/dashboard/forms/new/_components/form-preview';
import { FormTitle } from '#app/dashboard/forms/new/_components/form-title';

export default function NewForm() {
	return (
		<div className={'grid h-full w-full grid-cols-2 grid-rows-1 pb-1'}>
			<div className={'col-span-1 flex h-full flex-col gap-4'}>
				<div className={'flex items-center justify-between gap-4'}>
					<FormTitle />
					<Button variant={'outline'}>Settings</Button>
				</div>

				<div>Form items</div>
			</div>

			<div className={'col-span-1 flex h-full flex-col gap-4'}>
				<div className={'self-end'}>
					<CreateFormForm />
				</div>
				<FormPreview />
			</div>
		</div>
	);
}
