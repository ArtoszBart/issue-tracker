'use client';

import { Select } from '@radix-ui/themes';
import { Skeleton } from '@/components';
import IIssue from '@/models/issue';
import { Toaster } from 'react-hot-toast';
import useAssigneeSelect from './useAssigneeSelect';

interface IProps {
	issue: IIssue;
}

const AssigneeSelect = ({ issue }: IProps) => {
	const hook = useAssigneeSelect(issue);

	if (hook.isLoading) return <Skeleton height='2rem' />;

	if (hook.error) return null;

	return (
		<>
			<Select.Root
				defaultValue={issue.assignedToUserId || 'unassigned'}
				onValueChange={hook.assignIssue}
			>
				<Select.Trigger placeholder='Assign...' />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value='unassigned'>Unassigned</Select.Item>
						{hook.users?.map((user) => (
							<Select.Item value={user.id} key={user.id}>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	);
};

export default AssigneeSelect;
