import {
	Body,
	Container,
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
						<Text>
							<b>**Please note:**</b> This activation link will be
							active for only 15 minutes. If the link expires, you
							can click it again, and you will be given the option
							to request a new activation link.
						</Text>
						<Text className='text-base'>
							If the button doesn&apos;t work, copy and paste this
							link into your browser:
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
