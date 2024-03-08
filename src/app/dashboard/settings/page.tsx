import { Section } from '#components/ui/section';
import { Separator } from '#components/ui/separator';
import { requireUser } from '#lib/auth';
import { SlugForm } from '#app/dashboard/settings/_components/slug-form';
import { db } from '#db';
import { and, eq } from 'drizzle-orm';
import { inviteCodes } from '#db/schema/auth';
import { InviteCodeForm } from '#app/dashboard/settings/_components/invite-code-form';

export default async function SettingsPage() {
	const user = await requireUser();
	const inviteCode = await db.query.inviteCodes.findFirst({
		where: and(
			eq(inviteCodes.ownerId, user.id),
			eq(inviteCodes.isRevoked, false),
		),
	});

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
				<InviteCodeForm inviteCode={inviteCode?.code} />
			</Section>
		</div>
	);
}
