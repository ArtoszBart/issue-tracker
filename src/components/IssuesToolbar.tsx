import Link from 'next/link';
import { Box, Button, Flex } from '@radix-ui/themes';
import IssueStatusFilter from './IssueStatusFilter';
import IssuePageSizeSelector from './IssuePageSizeSelector';

const IssuesToolbar = () => {
	return (
		<Flex justify='between'>
			<Box className='space-x-2'>
				<IssueStatusFilter />
				<IssuePageSizeSelector />
			</Box>
			<Button>
				<Link href='/issues/new'>New Issue</Link>
			</Button>
		</Flex>
	);
};

export default IssuesToolbar;
