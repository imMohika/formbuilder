import { LoginForm } from '#app/(auth)/login/login-form';

export default async function LoginPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const target = searchParams['target'];
	return (
		<>
			<div>
				<h1 className={'text-2xl font-semibold tracking-tight'}>Welcome</h1>
			</div>

			<LoginForm target={target} />
		</>
	);
}
