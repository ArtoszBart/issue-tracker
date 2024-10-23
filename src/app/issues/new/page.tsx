'use client';

import 'easymde/dist/easymde.min.css';
import { Button, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
	loading: () => <p>Loading md editor...</p>,
});

const NewIssuePage = () => {
	return (
		<div className='max-w-xl space-y-3'>
			<TextField.Root placeholder='Title' />
			<SimpleMDE placeholder='Description' />
			<Button>Submit New Issue</Button>
		</div>
	);
};

export default NewIssuePage;
