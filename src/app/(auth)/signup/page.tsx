import SignUpForm from '@/components/forms/SignUpForm';
import { Heading } from '@radix-ui/themes';
import { Metadata } from 'next';

const SignUpPage = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-5'>
			<Heading>Sign Up</Heading>
			<SignUpForm />
		</div>
	);
};

export const metadata: Metadata = {
	title: 'Issue Tracker - Sign Up',
	description: 'Create an Account for Issue Tracker',
};

export default SignUpPage;
