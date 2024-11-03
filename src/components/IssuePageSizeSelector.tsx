'use client';

import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const pageSizes: string[] = ['5', '10', '20', '50'];

const IssuePageSizeSelector = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	return (
		<Select.Root
			defaultValue={searchParams.get('pageSize') || ''}
			onValueChange={(pageSize) => {
				const params = new URLSearchParams();
				if (pageSize) params.append('pageSize', pageSize);
				if (searchParams.get('status'))
					params.append('status', searchParams.get('status')!);
				if (searchParams.get('orderBy'))
					params.append('orderBy', searchParams.get('orderBy')!);
				if (searchParams.get('sort'))
					params.append('sort', searchParams.get('sort')!);
				if (searchParams.get('assignedTo'))
					params.append(
						'assignedTo',
						searchParams.get('assignedTo')!
					);

				const query = params.size ? `?${params.toString()}` : '';

				router.push('/issues' + query);
			}}
		>
			<Select.Trigger placeholder='Select page size...' />
			<Select.Content>
				{pageSizes.map((size) => (
					<Select.Item key={size} value={size}>
						{size}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default IssuePageSizeSelector;
