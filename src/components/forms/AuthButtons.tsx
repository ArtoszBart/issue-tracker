'use client';

import { Button, Callout } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const errorMessages: Record<string, string> = {
  OAuthAccountNotLinked:
    'An account with this email already exists. Please sign in using your original login method.',
  Default: 'An unexpected error occurred. Please try again.',
};

const AuthButtons = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorMessage = error
    ? (errorMessages[error] ?? errorMessages.Default)
    : null;

  const handleClick = async (service: string) => {
    await signIn(service, { callbackUrl: '/' }).catch(() =>
      toast.error('Failed to sign in'),
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
      {errorMessage && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}

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
