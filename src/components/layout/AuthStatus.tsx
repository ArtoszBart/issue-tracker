import { Box, DropdownMenu, Avatar, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const AuthStatus = () => {
	const { status, data: session } = useSession();

	if (status === 'loading') return null;
	if (status === 'unauthenticated')
		return (
			<Link className='nav-link' href='/api/auth/signin'>
				Log in
			</Link>
		);

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar
						src={session!.user!.image!}
						fallback='?'
						radius='full'
						className='cursor-pointer'
					/>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size='2'>{session!.user!.email}</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item>
						<Link href='/api/auth/signout'>Log out</Link>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};

export default AuthStatus;
