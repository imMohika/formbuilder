import { LoginForm } from '#app/(auth)/login/login-form';
import Link from 'next/link';
import { buttonVariants } from '#components/ui/button/button';
import { cn } from '#ui/utils';
import { requireAnonymous } from '#lib/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
};

export default async function LoginPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	await requireAnonymous();
	const target = searchParams['target'];
	return (
		<div className={'flex h-full w-full flex-col justify-center gap-4'}>
			<div>
				<h1 className={'text-center text-h1'}>Welcome back</h1>
				<p className={'text-center text-body-sm text-muted-foreground'}>
					Please enter your details
				</p>
			</div>

			<div className={'w-full px-8'}>
				<LoginForm target={target} />
			</div>

			<div className={'flex items-center justify-center gap-2'}>
				<p className={'text-muted-foreground'}>New here?</p>

				<Link
					href={{
						pathname: 'signup',
						query: {
							target,
						},
					}}
					className={cn(
						buttonVariants({ variant: 'link', size: 'none' }),
						'text-muted-foreground',
					)}
				>
					Create an account
				</Link>
			</div>
		</div>
	);
}
