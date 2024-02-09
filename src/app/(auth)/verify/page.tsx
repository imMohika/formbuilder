import { VerifyForm } from '#app/(auth)/verify/verify-form';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Verification',
};

export default async function VerifyPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const target = searchParams['target'];
	if (!target) {
		return redirect('/login');
	}

	return (
		<>
			<div>
				<h1 className={'text-xl font-semibold tracking-tight'}>
					Check your email
				</h1>
				<p className={'text-sm text-muted-foreground'}>
					{`We've sent a code to: `}
					<span className={'font-mono'}>{target}</span>
				</p>
			</div>

			<VerifyForm target={target} />
		</>
	);
}
