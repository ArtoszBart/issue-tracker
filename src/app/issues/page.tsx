import { IssuesToolbar } from '@/components';
import IssuePageSizeSelector from '@/components/IssuePageSizeSelector';
import IssueTable, { IIssueQuery } from '@/components/IssueTable/IssueTable';
import { columnNames } from '@/components/IssueTable/columnDefinitions';
import Pagination from '@/components/Pagination';
import { Status } from '@/models/status';
import { getIssues, getIssueCount } from '@/repository/issueRepository';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface IProps {
	searchParams: IIssueQuery;
}

const IssuesPage = async ({ searchParams }: IProps) => {
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	const assignedToUserId = searchParams.assignedTo;

	const orderBy = columnNames.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: searchParams.sort }
		: undefined;

	const page = Number(searchParams.page) || 1;
	const pageSize = Number(searchParams.pageSize) || 10;

	const issues = await getIssues({
		status,
		assignedToUserId,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const issueCount = await getIssueCount({
		status,
		assignedToUserId,
	});

	return (
		<Flex direction='column' gap='3'>
			<IssuesToolbar />
			<IssueTable searchParams={searchParams} issues={issues} />
			<Flex
				gap='3'
				className='flex-col items-center md:flex-row md:items-start'
			>
				<Pagination
					pageSize={pageSize}
					currentPage={page}
					itemCount={issueCount}
				/>
				<IssuePageSizeSelector />
			</Flex>
		</Flex>
	);
};

export const metadata: Metadata = {
	title: 'Issue Tracker - Issue List',
	description: 'View all project issues',
};

export default IssuesPage;
