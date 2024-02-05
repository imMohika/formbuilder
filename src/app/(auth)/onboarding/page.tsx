import { Metadata } from 'next';
import { OnboardingForm } from './onboarding-form';

export const metadata: Metadata = {
	title: 'Onboarding',
};

export default async function LoginPage() {
	return (
		<>
			<div>
				<h1 className={'text-2xl font-semibold tracking-tight'}>Welcome</h1>
			</div>

			<OnboardingForm />
		</>
	);
}
