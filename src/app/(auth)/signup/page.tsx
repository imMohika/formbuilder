import Link from 'next/link';
import { cn } from '#ui/utils';
import { buttonVariants } from '#components/ui/button/button';
import { SignupForm } from '#app/(auth)/signup/signup-form';
import { env } from '#utils/env';
import { requireAnonymous } from '#lib/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Signup',
};

export default async function LoginPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	await requireAnonymous();
	const target = searchParams['target'];
	const inviteCode = searchParams['invite-code'];
	const inviteOnly = env.INVITE_ONLY;

	return (
		<div className={'flex h-full w-full flex-col justify-center gap-4'}>
			<div>
				<h1 className={'text-center text-h1'}>Welcome</h1>
				<p className={'text-center text-body-sm text-muted-foreground'}>
					Please enter your details to create a new account
				</p>
			</div>

			<div className={'w-full px-8'}>
				<SignupForm
					target={target}
					inviteCode={inviteCode}
					inviteOnly={inviteOnly}
				/>
			</div>

			<div className={'flex items-center justify-center gap-2'}>
				<span className={'text-muted-foreground'}>
					Already have an account?
				</span>

				<Link
					href={{
						pathname: 'login',
						query: {
							target,
						},
					}}
					className={cn(
						buttonVariants({ variant: 'link', size: 'none' }),
						'text-muted-foreground',
					)}
				>
					Log in
				</Link>
			</div>
		</div>
	);
}
