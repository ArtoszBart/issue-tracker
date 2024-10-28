import { Status } from '@/models/status';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface IStatusContainer {
	label: string;
	value: number;
	status: Status;
}

interface IProps {
	open: number;
	inProgress: number;
	closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: IProps) => {
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
				<Card key={container.label}>
					<Flex direction='column' gap='1'>
						<Link
							href={`/issues?status=${container.status}`}
							className='text-sm font-medium'
						>
							{container.label}
						</Link>
						<Text size='5' className='font-bold'>
							{container.value}
						</Text>
					</Flex>
				</Card>
			))}
		</Flex>
	);
};

export default IssueSummary;
