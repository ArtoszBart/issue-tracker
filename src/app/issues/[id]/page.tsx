import { IssueStatusBadge } from '@/components';
import { getIssue } from '@/repository/issueRepository';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Pencil1Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface IProps {
	params: { id: string };
}

const IssueDetailPage = async ({ params }: IProps) => {
	const id = Number(params.id);
	if (isNaN(id)) notFound();

	const issue = await getIssue(id);
	if (!issue) notFound();

	return (
		<Grid columns={{ initial: '1', md: '2' }} gap='5'>
			<Box>
				<Heading>{issue.title}</Heading>
				<Flex gap='3' my='2'>
					<IssueStatusBadge status={issue.status} />
					<Text>{issue.createdAt.toDateString()}</Text>
				</Flex>
				<Card className='prose' mt='4'>
					<ReactMarkdown>{issue.description}</ReactMarkdown>
				</Card>
			</Box>
			<Box>
				<Button>
					<Pencil1Icon />
					<Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
				</Button>
			</Box>
		</Grid>
	);
};

export default IssueDetailPage;
