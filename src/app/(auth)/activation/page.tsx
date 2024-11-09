import LinkButton from '@/components/LinkButton';
import ResendEmailButton from '@/components/ResendEmailButton';
import { activateUser, getUserById } from '@/repository/userRepository';
import { compareHashedData } from '@/utils/crypt';
import { Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

interface IProps {
	searchParams: { id: string; token: string };
}

const ActivationPage = async ({ searchParams }: IProps) => {
	if (!searchParams.id || !searchParams.token) notFound();

	const user = await getUserById(searchParams.id);
	if (!user || !user.activationToken || !user.activationTokenExpiry)
		notFound();

	if (new Date(user.activationTokenExpiry) < new Date())
		return (
			<div className='flex flex-col items-center justify-center gap-5 text-center'>
				<Heading>Activation Link Expired</Heading>
				<Text>
					The link you used to activate your account has expired.
					Please request a new activation link.
				</Text>
				<ResendEmailButton userId={''} />
				<Toaster />
			</div>
		);

	const isTokenValid = compareHashedData(
		searchParams.token,
		user.activationToken!
	);
	if (!isTokenValid) notFound();

	// Make user active
	await activateUser(user.id);

	return (
		<div className='flex flex-col items-center justify-center gap-5 text-center'>
			<Heading>Account Activated Successfully</Heading>
			<Text>
				Your account has been activated! You can now log in and start
				using the platform.
			</Text>
			<LinkButton href='/api/auth/signin'>Sign In</LinkButton>
			<Toaster />
		</div>
	);
};

export default ActivationPage;
