import { Text } from '@radix-ui/themes';
import React from 'react';

interface IProps {
	message: string | undefined;
}

const ErrorMessage = ({ message }: IProps) => {
	if (!message) return null;

	return (
		<Text color='red' as='p'>
			{message}
		</Text>
	);
};

export default ErrorMessage;
