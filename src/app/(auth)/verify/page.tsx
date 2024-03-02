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
		<div className={'flex h-full w-full flex-col justify-center gap-4'}>
			<div className={'flex flex-col items-center justify-center'}>
				<h1 className={'text-h1'}>Check your email</h1>
				<p className={'text-body-md text-muted-foreground'}>
					{`We've sent a code to: `}
					<span className={'font-mono'}>{target}</span>
				</p>
			</div>

			<div className={'w-full px-8'}>
				<VerifyForm target={target} />
			</div>
		</div>
	);
}
