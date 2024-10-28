import IssueChart from '@/components/IssueChart';
import IssueSummary from '@/components/IssueSummary';
import LatestIssues from '@/components/LatestIssues';
import { getIssueCount } from '@/repository/issueRepository';
import { Flex, Grid } from '@radix-ui/themes';

export default async function Home() {
	const issueCount = {
		open: await getIssueCount({ status: 'OPEN' }),
		inProgress: await getIssueCount({ status: 'IN_PROGRESS' }),
		closed: await getIssueCount({ status: 'CLOSED' }),
	};

	return (
		<Grid columns={{ initial: '1', md: '2' }} gap='5'>
			<Flex direction='column' gap='5'>
				<IssueSummary data={issueCount} />
				<IssueChart data={issueCount} />
			</Flex>
			<LatestIssues />
		</Grid>
	);
}
