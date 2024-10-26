'use client';

import { Select } from '@radix-ui/themes';
import User from '@/models/user';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components';

const AssigneeSelect = () => {
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
		<Select.Root>
			<Select.Trigger placeholder='Assign...' />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
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
