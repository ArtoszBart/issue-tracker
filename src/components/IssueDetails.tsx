import { Heading, Flex, Card, Text, Box } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import IssueStatusBadge from './IssueStatusBadge';
import IIssue from '@/models/issue';
import { getStringDate } from '@/utils/dateTime';

interface IProps {
	issue: IIssue;
}

const IssueDetails = ({ issue }: IProps) => {
	return (
		<Box>
			<Heading>{issue.title}</Heading>
			<Flex gap='3' my='2'>
				<IssueStatusBadge status={issue.status} />
				<Text>{getStringDate(issue.createdAt)}</Text>
			</Flex>
			<Card className='prose max-w-full' mt='4'>
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</Card>
		</Box>
	);
};

export default IssueDetails;
