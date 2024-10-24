import IssueStatusBadge from '@/components/IssueStatusBadge';
import { getIssue } from '@/repository/issueRepository';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface IProps {
	params: { id: string };
}

const IssueDetailPage = async ({ params }: IProps) => {
	const id = Number(params.id);
	if (isNaN(id)) notFound();

	const issue = await getIssue(id);
	if (!issue) notFound();

	return (
		<div>
			<Heading>{issue.title}</Heading>
			<Flex gap='3' my='2'>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className='prose' mt='4'>
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</Card>
		</div>
	);
};

export default IssueDetailPage;
