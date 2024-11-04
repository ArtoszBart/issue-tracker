import { Flex, Heading, Text } from '@radix-ui/themes';
import { ReactNode } from 'react';
import { AiFillBug } from 'react-icons/ai';

interface IProps {
	heading: string;
	message: string;
	children: ReactNode;
}

const ErrorPageComponent = ({ heading, message, children }: IProps) => {
	return (
		<Flex className='flex-1 flex-col justify-center items-center gap-5'>
			<AiFillBug size={50} />
			<Flex className='flex-col items-center gap-1'>
				<Heading className='text-2xl'>{heading}</Heading>
				<Text className='text-xl'>{message}</Text>
			</Flex>
			{children}
		</Flex>
	);
};

export default ErrorPageComponent;
