import { Heading, Flex, Card, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import IssueStatusBadge from './IssueStatusBadge';
import IIssue from '@/models/issue';

interface IProps {
	issue: IIssue;
}

const IssueDetails = ({ issue }: IProps) => {
	return (
		<>
			<Heading>{issue.title}</Heading>
			<Flex gap='3' my='2'>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className='prose' mt='4'>
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</Card>
		</>
	);
};

export default IssueDetails;
