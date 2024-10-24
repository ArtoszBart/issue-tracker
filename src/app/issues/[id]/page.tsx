import { getIssue } from '@/repository/issueRepository';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from '@/components/EditIssueButton';
import IssueDetails from '@/components/IssueDetails';

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
				<IssueDetails issue={issue} />
			</Box>
			<Box>
				<EditIssueButton issueId={issue.id} />
			</Box>
		</Grid>
	);
};

export default IssueDetailPage;
