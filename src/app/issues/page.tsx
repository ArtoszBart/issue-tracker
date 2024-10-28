import { Table } from '@radix-ui/themes';
import { getIssues } from '@/repository/issueRepository';
import { Link, IssueStatusBadge, IssuesToolbar } from '@/components';
import NextLink from 'next/link';
import { Status } from '@/models/status';
import IIssue from '@/models/issue';
import {
	ArrowUpIcon,
	TriangleUpIcon,
	TriangleDownIcon,
} from '@radix-ui/react-icons';
import Pagination from '@/components/Pagination';

export const dynamic = 'force-dynamic';

interface IProps {
	searchParams: {
		status: Status;
		orderBy: keyof IIssue;
		sort: 'asc' | 'desc';
		page: string;
	};
}

interface ITableColumn {
	label: string;
	value: keyof IIssue;
	className?: string;
}

const IssuesPage = async ({ searchParams }: IProps) => {
	const columns: ITableColumn[] = [
		{ label: 'Issue', value: 'title' },
		{
			label: 'Status',
			value: 'status',
			className: 'hidden md:table-cell',
		},
		{
			label: 'Created',
			value: 'createdAt',
			className: 'hidden md:table-cell',
		},
	];

	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	const orderBy = columns
		.map((column) => column.value)
		.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: searchParams.sort }
		: undefined;

	const page = Number(searchParams.page) || 1;
	const pageSize = 10;

	const { issueCount, issues } = await getIssues({
		status,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	return (
		<div>
			<IssuesToolbar />
			<Table.Root variant='surface' mb='5'>
				<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<Table.ColumnHeaderCell
								key={column.value}
								className={column.className}
							>
								<NextLink
									href={{
										query: {
											...searchParams,
											orderBy: column.value,
											sort:
												column.value !==
												searchParams.orderBy
													? 'asc'
													: searchParams.sort ===
													  'desc'
													? 'asc'
													: 'desc',
										},
									}}
								>
									{column.label}
									{column.value === searchParams.orderBy &&
										(searchParams.sort === 'asc' ? (
											<TriangleUpIcon className='inline' />
										) : (
											<TriangleDownIcon className='inline' />
										))}
								</NextLink>
							</Table.ColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Link href={`/issues/${issue.id}`}>
									{issue.title}
								</Link>
								<div className='block md:hidden'>
									<IssueStatusBadge status={issue.status} />
								</div>
							</Table.Cell>
							<Table.Cell className='hidden md:table-cell'>
								<IssueStatusBadge status={issue.status} />
							</Table.Cell>
							<Table.Cell className='hidden md:table-cell'>
								{issue.createdAt.toDateString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
			<Pagination
				pageSize={pageSize}
				currentPage={page}
				itemCount={issueCount}
			/>
		</div>
	);
};

export default IssuesPage;
