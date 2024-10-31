import SignOutButton from '@/components/forms/SignOutButton';
import { Heading, Text } from '@radix-ui/themes';
import { Metadata } from 'next';
import React from 'react';

const SignOutPage = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-5'>
			<Heading>Sign out</Heading>
			<Text>Are you sure you want to sign out?</Text>
			<div className='w-full max-w-xs center justify-stretch text-center space-y-8'>
				<SignOutButton />
			</div>
		</div>
	);
};

export default SignOutPage;

export const metadata: Metadata = {
	title: 'Issue Tracker - Sign Out',
	description: 'Sign out from Issue Tracker',
};
