import { getIssue } from '@/repository/issueRepository';
import { Box, Flex, Grid, Separator } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from '@/components/EditIssueButton';
import IssueDetails from '@/components/IssueDetails';
import DeleteIssueButton from '@/components/DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/auth/authOptions';
import AssigneeSelect from '@/components/AssigneeSelect/AssigneeSelect';
import { cache } from 'react';
import { StatusSelect } from '@/components/StatusSelect';
import Comments from '@/components/Comments';

interface IProps {
	params: { id: string };
}

const fetchIssue = cache((issueId: number) => getIssue(issueId));

const IssueDetailPage = async ({ params }: IProps) => {
	const session = await getServerSession(authOptions);

	const id = Number(params.id);
	if (isNaN(id)) notFound();

	const issue = await fetchIssue(id);
	if (!issue) notFound();

	return (
		<Grid columns={{ initial: '1', sm: '5' }} gap='5'>
			<Flex className='md:col-span-4' direction='column' gap='6'>
				<IssueDetails issue={issue} />
				<Separator className='w-full' />
				<Comments comments={issue.comments} />
			</Flex>
			{session && (
				<Box>
					<Flex direction='column' gap='4'>
						<AssigneeSelect issue={issue} />
						<StatusSelect issue={issue} />
						<EditIssueButton issueId={issue.id} />
						<DeleteIssueButton issueId={issue.id} />
					</Flex>
				</Box>
			)}
		</Grid>
	);
};

export async function generateMetadata({ params }: IProps) {
	const issue = await fetchIssue(Number(params.id));

	return {
		title: issue?.title,
		description: 'Details of issue ' + issue?.id,
	};
}

export default IssueDetailPage;
