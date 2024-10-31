'use client';

import { Button } from '@radix-ui/themes';
import React from 'react';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
	return (
		<Button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</Button>
	);
};

export default SignOutButton;
