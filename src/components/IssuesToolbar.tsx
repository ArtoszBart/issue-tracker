import Link from 'next/link';
import { Button, Flex } from '@radix-ui/themes';
import IssueStatusFilter from './IssueStatusFilter';
import IssueAssigneeFilter from './IssueAssigneeFilter';

const IssuesToolbar = () => {
	return (
		<Flex justify='between'>
			<Flex gap='2' className='bugged-skeleton'>
				<IssueStatusFilter />
				<IssueAssigneeFilter />
			</Flex>
			<Button>
				<Link href='/issues/new'>New Issue</Link>
			</Button>
		</Flex>
	);
};

export default IssuesToolbar;
