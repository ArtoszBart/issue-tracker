'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../Spinner';

interface ICredentials {
	email: string;
	password: string;
}

const CredentialsForm = () => {
	const router = useRouter();
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { register, handleSubmit } = useForm<ICredentials>();

	const onSubmit = handleSubmit(async ({ email, password }) => {
		setIsSubmitting(true);
		const signInResponse = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});

		if (signInResponse && !signInResponse.error) {
			router.push('/');
		} else {
			setIsSubmitting(false);
			setError('Your Email or Password is incorrect.');
		}
	});

	return (
		<>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className='space-y-3' onSubmit={onSubmit}>
				<TextField.Root placeholder='Email' {...register('email')} />
				<TextField.Root
					placeholder='Password'
					type='password'
					{...register('password')}
				/>
				<Button disabled={isSubmitting}>
					{isSubmitting && <Spinner />}
					Sign in with Credentials
				</Button>
			</form>
		</>
	);
};

export default CredentialsForm;
