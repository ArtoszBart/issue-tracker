'use client';

import Spinner from '@/components/Spinner';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { FaCheck, FaTimes } from 'react-icons/fa';
import ErrorMessage from '../ErrorMessage';
import useSignUpForm from './useSignUpForm';

const SignUpForm = () => {
	const hook = useSignUpForm();

	return (
		<div className='w-full max-w-xs center justify-stretch text-center space-y-8'>
			{hook.error && (
				<Callout.Root color='red' className='mb-5'>
					<Callout.Text>{hook.error}</Callout.Text>
				</Callout.Root>
			)}

			<form className='space-y-3' onSubmit={hook.onSubmit}>
				<TextField.Root placeholder='Name' {...hook.register('name')} />
				<ErrorMessage message={hook.errors.name?.message} />
				<TextField.Root
					placeholder='Email'
					type='email'
					{...hook.register('email')}
				/>
				<ErrorMessage message={hook.errors.email?.message} />
				<TextField.Root
					placeholder='Password'
					type='password'
					{...hook.register('password')}
				/>
				<ErrorMessage message={hook.errors.password?.message} />
				<ul className='text-sm text-left'>
					{hook.passwordGuidelines.map((option) => (
						<li
							key={option.value}
							className='flex items-center gap-1'
						>
							{hook.passwordContent.includes(option.value) ? (
								<FaCheck color='green' />
							) : (
								<FaTimes color='darkRed' />
							)}{' '}
							{option.text}
						</li>
					))}
				</ul>
				<TextField.Root
					placeholder='Confirm password'
					type='password'
					{...hook.register('confirmPassword')}
				/>
				<ErrorMessage message={hook.errors.confirmPassword?.message} />
				<Button disabled={hook.isSubmitting}>
					{hook.isSubmitting && <Spinner />}
					Sign Up
				</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
