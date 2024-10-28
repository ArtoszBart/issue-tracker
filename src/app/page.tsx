import IssueChart from '@/components/IssueChart';
import IssueSummary from '@/components/IssueSummary';
import LatestIssues from '@/components/LatestIssues';
import { getIssueCount } from '@/repository/issueRepository';

export default async function Home() {
	const openIssueCount = await getIssueCount({ status: 'OPEN' });
	const inProgressIssueCount = await getIssueCount({ status: 'IN_PROGRESS' });
	const closedIssueCount = await getIssueCount({ status: 'CLOSED' });

	return (
		// <IssueSummary
		// 	open={openIssueCount}
		// 	inProgress={inProgressIssueCount}
		// 	closed={closedIssueCount}
		// />
		<IssueChart
			open={openIssueCount}
			inProgress={inProgressIssueCount}
			closed={closedIssueCount}
		/>
	);
}
