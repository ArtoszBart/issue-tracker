import { TriangleUpIcon, TriangleDownIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import Link from '../Link';
import NextLink from 'next/link';
import IssueStatusBadge from '../IssueStatusBadge';
import IIssue from '@/models/issue';
import { Status } from '@/models/status';
import { columns } from './columnDefinitions';

export interface IIssueQuery {
	status: Status;
	orderBy: keyof IIssue;
	sort: 'asc' | 'desc';
	page: string;
	pageSize: string;
}

interface IProps {
	searchParams: IIssueQuery;
	issues: IIssue[];
}

const IssueTable = ({ searchParams, issues }: IProps) => {
	return (
		<Table.Root variant='surface'>
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
												: searchParams.sort === 'desc'
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
	);
};

export default IssueTable;
