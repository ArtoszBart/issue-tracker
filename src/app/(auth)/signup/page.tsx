import SignUpForm from '@/components/forms/SignUpForm';
import { Heading } from '@radix-ui/themes';

const SignUpPage = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-5'>
			<Heading>Sign Up</Heading>
			<SignUpForm />
		</div>
	);
};

export default SignUpPage;
