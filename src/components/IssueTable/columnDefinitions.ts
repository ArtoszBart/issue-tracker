import IIssue from '@/models/issue';

interface ITableColumn {
	label: string;
	value: keyof IIssue;
	className?: string;
}

export const columns: ITableColumn[] = [
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

export const columnNames = columns.map((column) => column.value);
