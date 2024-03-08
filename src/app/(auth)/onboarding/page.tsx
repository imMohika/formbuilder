import { Metadata } from 'next';
import { OnboardingForm } from './onboarding-form';
import { requireUser } from '#lib/auth';

export const metadata: Metadata = {
	title: 'Onboarding',
};

export default async function OnboardingPage() {
	const user = await requireUser();

	return (
		<div className={'flex h-full w-full flex-col justify-center gap-4'}>
			<div>
				<h1 className={'text-center text-h1'}>Welcome aboard!</h1>
				<p className={'text-center text-body-md text-muted-foreground'}>
					Please enter your details
				</p>
			</div>

			<div className={'w-full px-8'}>
				<OnboardingForm user={user} />
			</div>
		</div>
	);
}
