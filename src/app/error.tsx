'use client';

import ErrorPageComponent from '@/components/ErrorPageComponent';
import { Button } from '@radix-ui/themes';

interface IProps {
	error: Error;
	reset: () => void;
}

const ErrorPage = ({ error, reset }: IProps) => {
	console.log('Error:', error);

	return (
		<ErrorPageComponent
			heading='An unexpected error has occurred.'
			message='Oh no! Bugs made their way here too!'
		>
			<Button onClick={reset}>Retry</Button>
		</ErrorPageComponent>
	);
};

export default ErrorPage;
