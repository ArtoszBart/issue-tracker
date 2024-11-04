import ErrorPageComponent from '@/components/ErrorPageComponent';
import LinkButton from '@/components/LinkButton';
import { Metadata } from 'next';

const NotFoundPage = () => {
	return (
		<ErrorPageComponent
			heading='404 - Not Found'
			message='Oh no! Bugs ate everything here!'
		>
			<LinkButton href='/'>Back to Dashboard</LinkButton>
		</ErrorPageComponent>
	);
};

export const metadata: Metadata = {
	title: '404 Not Found',
	description: "This page doesn't exist",
};

export default NotFoundPage;
