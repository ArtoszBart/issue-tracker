import { Table } from '@radix-ui/themes';
import { getIssues } from '@/repository/issueRepository';
import { Link, IssueStatusBadge, IssuesToolbar } from '@/components';
import NextLink from 'next/link';
import { Status } from '@/models/status';
import IIssue from '@/models/issue';
import { ArrowUpIcon } from '@radix-ui/react-icons';

export const dynamic = 'force-dynamic';

interface IProps {
	searchParams: { status: Status; orderBy: keyof IIssue };
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
	const issues = await getIssues({ status });

	return (
		<div>
			<IssuesToolbar />
			<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<Table.ColumnHeaderCell
								key={column.value}
								className='hidden md:table-cell'
							>
								<NextLink
									href={{
										query: {
											...searchParams,
											orderBy: column.value,
										},
									}}
								>
									{column.label}
								</NextLink>
								{column.value === searchParams.orderBy && (
									<ArrowUpIcon className='inline' />
								)}
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
		</div>
	);
};

export default IssuesPage;
