import Status from '@/models/status';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface IStatusContainer {
	label: string;
	value: number;
	status: Status;
}

interface IProps {
	data: { open: number; inProgress: number; closed: number };
}

const IssueSummary = ({ data: { open, inProgress, closed } }: IProps) => {
	const containers: IStatusContainer[] = [
		{ label: 'Open issues', value: open, status: 'OPEN' },
		{
			label: 'In-progress issues',
			value: inProgress,
			status: 'IN_PROGRESS',
		},
		{ label: 'Closed issues', value: closed, status: 'CLOSED' },
	];

	return (
		<Flex gap='4'>
			{containers.map((container) => (
				<Link
					href={`/issues?status=${container.status}`}
					key={container.label}
				>
					<Card className='hover:bg-light-hover transition-colors duration-300'>
						<Flex direction='column' gap='1'>
							<Text className='text-sm font-medium'>
								{container.label}
							</Text>
							<Text size='5' className='font-bold'>
								{container.value}
							</Text>
						</Flex>
					</Card>
				</Link>
			))}
		</Flex>
	);
};

export default IssueSummary;
