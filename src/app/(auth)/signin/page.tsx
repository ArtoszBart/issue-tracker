import authOptions from '@/auth/authOptions';
import { Link } from '@/components';
import AuthButtons from '@/components/forms/AuthButtons';
import CredentialsForm from '@/components/forms/CredentialsForm';
import { Heading } from '@radix-ui/themes';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

const page = async () => {
	const session = await getServerSession(authOptions);

	if (session) redirect('/');

	return (
		<div className='flex flex-col items-center justify-center gap-5'>
			<Heading>Sign in</Heading>
			<div className='w-full max-w-xs center justify-stretch text-center space-y-8'>
				<CredentialsForm />
				<Link href='/signup' className='text-xs'>
					Don&apos;t have an account? Create one here.
				</Link>
				<hr className='border-neutral-500 overflow-visible before:content-["or"] before:text-neutral-500 before:relative before:-top-3.5 before:bg-white before:px-2' />
				<div className='space-y-3'>
					<AuthButtons />
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export default page;

export const metadata: Metadata = {
	title: 'Issue Tracker - Sign In',
	description: 'Sign in to Issue Tracker',
};
