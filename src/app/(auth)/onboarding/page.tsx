import { Metadata } from 'next';
import { OnboardingForm } from './onboarding-form';
import { requireUser } from '#lib/auth';

export const metadata: Metadata = {
	title: 'Onboarding',
};

export default async function OnboardingPage() {
	const user = await requireUser();

	return (
		<>
			<div>
				<h1
					className={
						'overflow-hidden overflow-ellipsis whitespace-nowrap text-xl font-semibold tracking-tight'
					}
				>
					Welcome <span className={'font-mono text-lg'}>{user.email}</span>
				</h1>
				<p className={'text-sm text-muted-foreground'}>
					Please enter your details
				</p>
			</div>

			<OnboardingForm />
		</>
	);
}
