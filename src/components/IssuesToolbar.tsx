import React from 'react';
import Link from 'next/link';
import { Button } from '@radix-ui/themes';

const IssuesToolbar = () => {
	return (
		<Button className='mb-5'>
			<Link href='/issues/new'>New Issue</Link>
		</Button>
	);
};

export default IssuesToolbar;
