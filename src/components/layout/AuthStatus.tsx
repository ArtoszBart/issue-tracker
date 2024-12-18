import { Box, DropdownMenu, Avatar, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Skeleton } from '@/components';
import PlaceholderImage from '@/assets/placeholder.png';

const AuthStatus = () => {
	const { status, data: session } = useSession();

	if (status === 'loading') return <Skeleton width='3rem' />;
	if (status === 'unauthenticated')
		return (
			<Link className='nav-link' href='/api/auth/signin'>
				Sign in
			</Link>
		);

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar
						src={session!.user!.image || PlaceholderImage.src}
						fallback=''
						radius='full'
						className='cursor-pointer'
					/>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size='2'>{session!.user!.email}</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item asChild>
						<Link href='/api/auth/signout'>Log out</Link>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};

export default AuthStatus;
