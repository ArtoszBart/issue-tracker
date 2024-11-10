'use client';

import { Button } from '@radix-ui/themes';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

const AuthButtons = () => {
	const handleClick = async (service: string) => {
		await signIn(service, { callbackUrl: '/' }).catch(() =>
			toast.error('Failed to sign in')
		);
	};

	const providers = [
		{
			label: 'Google',
			value: 'google',
			className: 'bg-white text-black border border-solid border-black',
			icon: <FcGoogle />,
		},
		{
			label: 'GitHub',
			value: 'github',
			className: 'bg-black text-white',
			icon: <FaGithub />,
		},
		{
			label: 'Facebook',
			value: 'facebook',
			className: 'bg-facebook text-white',
			icon: <FaFacebook />,
		},
	];

	return (
		<>
			{providers.map((provider) => (
				<Button
					key={provider.value}
					className={provider.className}
					onClick={() => handleClick(provider.value)}
				>
					{provider.icon}
					Sign in with {provider.label}
				</Button>
			))}
		</>
	);
};

export default AuthButtons;
