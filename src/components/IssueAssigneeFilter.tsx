'use client';

import useUsers from '@/data/useUsers';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components';

const IssueAssigneeFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const { data: users, error, isLoading } = useUsers();

	if (isLoading) return <Skeleton height='2rem' width='10.5rem' />;

	if (error) return null;

	return (
		<Select.Root
			value={searchParams.get('assignedTo') || ''}
			onValueChange={(userId) => {
				const params = new URLSearchParams();
				if (userId && userId !== 'none')
					params.append('assignedTo', userId);
				if (searchParams.get('orderBy'))
					params.append('orderBy', searchParams.get('orderBy')!);
				if (searchParams.get('sort'))
					params.append('sort', searchParams.get('sort')!);
				if (searchParams.get('status'))
					params.append('status', searchParams.get('status')!);
				if (searchParams.get('pageSize'))
					params.append('pageSize', searchParams.get('pageSize')!);

				const query = params.size ? `?${params.toString()}` : '';

				router.push('/issues' + query);
			}}
		>
			<Select.Trigger placeholder='Filter by assignee...' />
			<Select.Content>
				{users?.map((user) => (
					<Select.Item key={user.id} value={user.id}>
						{user.name}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default IssueAssigneeFilter;
