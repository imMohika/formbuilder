import { PasswordLoginForm } from './password-login-form';
import { redirect } from 'next/navigation';

export default async function PasswordLoginPage({
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
				<h1
					className={
						'overflow-hidden overflow-ellipsis whitespace-nowrap text-xl font-semibold tracking-tight'
					}
				>
					Welcome <span className={'font-mono text-lg'}>{target}</span>
				</h1>
				<p className={'text-sm text-muted-foreground'}>
					Please enter your password
				</p>
			</div>

			<PasswordLoginForm target={target} />
		</>
	);
}
