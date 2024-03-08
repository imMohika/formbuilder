import { Section } from '#components/ui/section';
import { Separator } from '#components/ui/separator';
import { requireUser } from '#lib/auth';
import { SlugForm } from '#app/dashboard/settings/_components/slug-form';

export default async function SettingsPage() {
	const user = await requireUser();
	return (
		<div className={'mx-auto flex w-full max-w-lg flex-col gap-4'}>
			<div>
				<p className={'text-body-xl font-semibold'}>Settings</p>
				<Separator />
			</div>

			<Section>
				<SlugForm user={user} />
			</Section>

			<Section>
				<div>Invite Code</div>
			</Section>
		</div>
	);
}
