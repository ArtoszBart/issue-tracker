'use client';

import { Card } from '@radix-ui/themes';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

interface IProps {
	data: { open: number; inProgress: number; closed: number };
}

const IssueChart = ({ data: { open, inProgress, closed } }: IProps) => {
	const data = [
		{ label: 'Open', value: open },
		{ label: 'In Progress', value: inProgress },
		{ label: 'Closed', value: closed },
	];

	return (
		<Card>
			<ResponsiveContainer width='100%' height={300}>
				<BarChart data={data}>
					<XAxis dataKey='label' />
					<YAxis />
					<Bar
						dataKey='value'
						barSize={60}
						style={{ fill: 'var(--accent-9)' }}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Card>
	);
};

export default IssueChart;
