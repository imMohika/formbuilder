import { User } from 'lucia';
import { Button } from '#components/ui/button';
import { Menu, MenuDropdown, MenuLink, MenuSection } from '#components/ui/menu';
import { Icon } from '#components/icons';
import { Separator } from '#components/ui/separator';
import { LogoutButton } from '#components/logout-button';

export const UserAccount = ({ user }: { user: User }) => {
	return (
		<Menu>
			<Button size={'icon'} variant={'outline'}>
				<Icon name={'avatar'} size={'lg'} />
			</Button>

			<MenuDropdown>
				<p className={'text-sm'}>Signed in as</p>
				<p className={'text-xs'}>{user.email}</p>
				<Separator />

				<MenuSection title={'Navigation'} showDivider>
					<MenuLink href={'/dashboard'} className={'flex items-center gap-1'}>
						<Icon name={'dashboard'} />
						Dashboard
					</MenuLink>
					<MenuLink
						href={'/dashboard/settings'}
						className={'flex items-center gap-1'}
					>
						<Icon name={'gear'} />
						Settings
					</MenuLink>
				</MenuSection>

				<MenuSection title={'Actions'}>
					<LogoutButton variant={'destructive'} size={'sm'} />
				</MenuSection>
			</MenuDropdown>
		</Menu>
	);
};
