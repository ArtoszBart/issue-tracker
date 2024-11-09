import {
	Body,
	Container,
	Head,
	Html,
	Link,
	Preview,
	Tailwind,
	Text,
} from '@react-email/components';
import { IAccountActivationEmail } from '.';

const AccountActivation = (payload: IAccountActivationEmail) => {
	return (
		<Html lang='en'>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<Preview>Welcome aboard!</Preview>
			<Tailwind>
				<Body className='bg-white'>
					<Container>
						<Text className='text-2xl font-bold'>
							Hi {payload.name}
						</Text>
						<Text className='text-base'>
							Thank you for signing up with Issue Tracker! To
							complete your registration and activate your
							account, please click the button below:
						</Text>
						<Link
							href={`${process.env.BASE_URL}/activation?id=${payload.id}&token=${payload.activationToken}`}
							className='bg-violet-500 text-white text-sm py-1.5 px-2 rounded-md'
						>
							Activate My Account
						</Link>
						<Text className='text-base'>
							If the button doesn't work, copy and paste this link
							into your browser:
						</Text>
						<Link
							href={`${process.env.BASE_URL}/activation?id=${payload.id}&token=${payload.activationToken}`}
							className='text-violet-500 text-sm'
						>
							{`${process.env.BASE_URL}/activation?id=${payload.id}&token=${payload.activationToken}`}
						</Link>
						<Text className='text-base'>
							Once your account is activated, you&apos;ll be able
							to log in and enjoy all the features of Issue
							Tracker.
						</Text>
						<Text className='text-base'>
							If you did not create an account, please ignore this
							email.
						</Text>
						<Text className='text-base'>
							Thanks,
							<br />
							Bartosz Art
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default AccountActivation;
