'use client';

import { Select } from '@radix-ui/themes';
import User from '@/models/user';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components';
import IIssue from '@/models/issue';

interface IProps {
	issue: IIssue;
}

const AssigneeSelect = ({ issue }: IProps) => {
	const {
		data: users,
		error,
		isLoading,
	} = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () => axios.get('/api/users').then((res) => res.data),
		staleTime: 60 * 1000,
		retry: 2,
	});

	if (isLoading) return <Skeleton height='2rem' />;

	if (error) return null;

	return (
		<Select.Root
			defaultValue={issue.assignedToUserId || 'unassigned'}
			onValueChange={(userId) => {
				axios.patch(`/api/issues/${issue.id}`, {
					assignedToUserId: userId === 'unassigned' ? null : userId,
				});
			}}
		>
			<Select.Trigger placeholder='Assign...' />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					<Select.Item value='unassigned'>Unassigned</Select.Item>
					{users?.map((user) => (
						<Select.Item value={user.id} key={user.id}>
							{user.name}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default AssigneeSelect;
