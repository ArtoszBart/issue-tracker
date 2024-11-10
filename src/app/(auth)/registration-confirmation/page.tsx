'use client';

import { Spinner } from '@/components';
import LinkButton from '@/components/LinkButton';
import { Heading, Text } from '@radix-ui/themes';
import axios from 'axios';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface IProps {
	searchParams: { id: string };
}

const RegistrationConfirmationPage = ({ searchParams }: IProps) => {
	if (!searchParams.id) redirect('/');

	const [isResending, setIsResending] = useState(false);

	const resendEmail = () => {
		setIsResending(true);
		axios
			.patch('/api/auth/resend-activation', { id: searchParams.id })
			.then(() => toast.success('Activation email has been resent'))
			.catch(() => toast.error('Error resending activation email'))
			.finally(() => setIsResending(false));
	};

	return (
		<div className='flex flex-col items-center justify-center gap-5 text-center'>
			<Heading>Registration Successful!</Heading>
			<Text>
				Thank you for registering. Please check your email inbox to
				confirm your account. Once activated, you&apos;ll be able to log
				in.
			</Text>
			<Text>
				Didn&apos;t receive the email?{' '}
				<Text
					className='text-accent hover:underline cursor-pointer'
					onClick={resendEmail}
				>
					Resend Activation Email
				</Text>{' '}
				{isResending && <Spinner />}
			</Text>
			<LinkButton href='/api/auth/signin'>Sign in</LinkButton>
			<Toaster />
		</div>
	);
};

export const metadata: Metadata = {
	title: 'Issue Tracker - Registration Confirmation',
	description: 'Account Created Successfully',
};

export default RegistrationConfirmationPage;
