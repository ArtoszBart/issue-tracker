import { IssuesToolbar } from '@/components';
import IssueTable, { IIssueQuery } from '@/components/IssueTable/IssueTable';
import { columnNames } from '@/components/IssueTable/columnDefinitions';
import Pagination from '@/components/Pagination';
import { Status } from '@/models/status';
import { getIssues, getIssueCount } from '@/repository/issueRepository';
import { Flex } from '@radix-ui/themes';

export const dynamic = 'force-dynamic';

interface IProps {
	searchParams: IIssueQuery;
}

const IssuesPage = async ({ searchParams }: IProps) => {
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	const orderBy = columnNames.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: searchParams.sort }
		: undefined;

	const page = Number(searchParams.page) || 1;
	const pageSize = 10;

	const issues = await getIssues({
		status,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const issueCount = await getIssueCount({ status });

	return (
		<Flex direction='column' gap='3'>
			<IssuesToolbar />
			<IssueTable searchParams={searchParams} issues={issues} />
			<Pagination
				pageSize={pageSize}
				currentPage={page}
				itemCount={issueCount}
			/>
		</Flex>
	);
};

export default IssuesPage;
