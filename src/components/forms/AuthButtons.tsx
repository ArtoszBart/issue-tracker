'use client';

import { Button } from '@radix-ui/themes';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

const AuthButtons = () => {
	const handleClick = async (service: string) => {
		const res = await signIn(service, { callbackUrl: '/' });
		console.log(res);
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
