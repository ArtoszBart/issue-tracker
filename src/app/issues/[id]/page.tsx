import { getIssue } from '@/repository/issueRepository';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from '@/components/EditIssueButton';
import IssueDetails from '@/components/IssueDetails';
import DeleteIssueButton from '@/components/DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/auth/authOptions';

interface IProps {
	params: { id: string };
}

const IssueDetailPage = async ({ params }: IProps) => {
	const session = await getServerSession(authOptions);

	const id = Number(params.id);
	if (isNaN(id)) notFound();

	const issue = await getIssue(id);
	if (!issue) notFound();

	return (
		<Grid columns={{ initial: '1', sm: '5' }} gap='5'>
			<Box className='md:col-span-4'>
				<IssueDetails issue={issue} />
			</Box>
			{session && (
				<Box>
					<Flex direction='column' gap='4'>
						<EditIssueButton issueId={issue.id} />
						<DeleteIssueButton issueId={issue.id} />
					</Flex>
				</Box>
			)}
		</Grid>
	);
};

export default IssueDetailPage;
