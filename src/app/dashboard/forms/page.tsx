import { Separator } from '#components/ui/separator';
import Link from 'next/link';
import { cn } from '#ui/utils';
import { buttonVariants } from '#components/ui/button/button';
import { Icon } from '#components/icons';
import { FormList } from '#app/dashboard/forms/_components/form-list';

export default async function FormsPage() {
	return (
		<div className={'flex w-full flex-col gap-2'}>
			<div className={'flex w-full justify-between gap-4'}>
				<p className={'text-body-xl font-semibold'}>Forms</p>

				<Link
					href={'forms/new'}
					className={cn(
						buttonVariants({
							size: 'lg',
						}),
					)}
				>
					New Form
					<Icon name={'plus'} />
				</Link>
			</div>

			<Separator />

			<FormList />
		</div>
	);
}
