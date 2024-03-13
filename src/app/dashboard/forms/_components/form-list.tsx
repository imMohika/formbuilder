import { requireUser } from '#lib/auth';
import { db } from '#db';
import { eq } from 'drizzle-orm';
import { Form, forms } from '#db/schema/forms';
import { CopyButton } from '#components/ui/copy-button';
import { getBaseUrl } from '#utils/misc';
import { User } from 'lucia';
import Link from 'next/link';
import { cn } from '#ui/utils';
import { buttonVariants } from '#components/ui/button/button';

export const FormList = async () => {
	const user = await requireUser();
	const data = await db.query.forms.findMany({
		where: eq(forms.ownerId, user.id),
		limit: 10,
	});

	if (!data || data.length === 0) {
		return <p className={'text-body-md'}>{`You don't have any forms`}</p>;
	}

	return (
		<div className={'flex flex-wrap gap-4'}>
			{data.map(form => (
				<Form key={form.id} form={form} user={user} />
			))}
		</div>
	);
};
const Form = ({ form, user }: { form: Form; user: User }) => {
	const link = `${getBaseUrl()}/${user.slug}/${form.slug}`;
	return (
		<div className={'flex flex-col gap-2 rounded-sm border border-border p-4'}>
			<p className={'text-body-sm font-medium capitalize'}>{form.title}</p>

			<div className={'flex gap-4'}>
				<Link
					href={link}
					target={'_blank'}
					className={cn(buttonVariants({ size: 'sm' }))}
				>
					Open Link
				</Link>

				<CopyButton value={link} copyText={'Copy Link'} />
			</div>
		</div>
	);
};
