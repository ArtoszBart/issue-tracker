import { Link } from '@/components';
import LinkButton from '@/components/LinkButton';
import { Heading, Text } from '@radix-ui/themes';

const RegistrationConfirmationPage = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-5'>
			<Heading>Registration Successful!</Heading>
			<Text>
				Thank you for registering. Please check your email inbox to
				confirm your account. Once activated, you&apos;ll be able to log
				in.
			</Text>
			<Text>
				Didn&apos;t receive the email?{' '}
				<Link href='/resend-activation'>Resend Activation Email</Link>
			</Text>
			<LinkButton href='/api/auth/signin'>Sign in</LinkButton>
		</div>
	);
};

export default RegistrationConfirmationPage;
