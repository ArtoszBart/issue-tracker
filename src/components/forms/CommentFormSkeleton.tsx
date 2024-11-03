import { Box, Flex } from '@radix-ui/themes';
import React from 'react';
import { Skeleton } from '@/components';

const CommentFormSkeleton = () => {
	return (
		<Box>
			<Skeleton height='2.5rem' width='13rem' />
			<Flex gap='2' my='1'>
				<Skeleton height='2.5rem' width='2.5rem' />
				<Flex className='flex-1 flex-col gap-5'>
					<Skeleton height='15rem' />
					<Skeleton height='2rem' width='6rem' />
				</Flex>
			</Flex>
		</Box>
	);
};

export default CommentFormSkeleton;
