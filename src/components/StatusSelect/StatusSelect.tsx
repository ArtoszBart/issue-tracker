'use client';

import { Select } from '@radix-ui/themes';
import { IssueStatusBadge } from '@/components';
import IIssue from '@/models/issue';
import { Toaster } from 'react-hot-toast';
import useStatusSelect from './useStatusSelect';

interface IProps {
	issue: IIssue;
}
const StatusSelect = ({ issue }: IProps) => {
	const hook = useStatusSelect(issue);

	return (
		<>
			<Select.Root value={issue.status} onValueChange={hook.changeStatus}>
				<Select.Trigger />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						{hook.statuses.map((status) => (
							<Select.Item value={status} key={status}>
								<IssueStatusBadge status={status} />
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	);
};

export default StatusSelect;
