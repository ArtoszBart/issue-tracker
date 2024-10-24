'use client';

import 'easymde/dist/easymde.min.css';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { NewIssue, newIssueSchema } from '@/models/issue';
import { zodResolver } from '@hookform/resolvers/zod';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
	loading: () => <p>Loading md editor...</p>,
});

const NewIssuePage = () => {
	const router = useRouter();
	const [error, setError] = useState('');
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<NewIssue>({
		resolver: zodResolver(newIssueSchema),
	});

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}

			<form
				className='space-y-3'
				onSubmit={handleSubmit(async (data) => {
					try {
						await axios.post('/api/issues', data);
						router.push('/issues');
					} catch (error) {
						setError('An unexpected error occured.');
					}
				})}
			>
				<TextField.Root placeholder='Title' {...register('title')} />
				{errors.title && (
					<Text color='red' as='p'>
						{errors.title.message}
					</Text>
				)}
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>
				{errors.description && (
					<Text color='red' as='p'>
						{errors.description.message}
					</Text>
				)}
				<Button>Submit New Issue</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
