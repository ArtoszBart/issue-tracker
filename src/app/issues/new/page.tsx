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
import ErrorMessage from '@/components/forms/ErrorMessage';
import Spinner from '@/components/Spinner';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
	loading: () => <p>Loading md editor...</p>,
});
import delay from 'delay';

const NewIssuePage = async () => {
	await delay(2000);
	const router = useRouter();
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<NewIssue>({
		resolver: zodResolver(newIssueSchema),
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			setIsSubmitting(true);
			await axios.post('/api/issues', data);
			router.push('/issues');
		} catch (error) {
			setIsSubmitting(false);
			setError('An unexpected error occured.');
		}
	});

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}

			<form className='space-y-3' onSubmit={onSubmit}>
				<TextField.Root placeholder='Title' {...register('title')} />
				<ErrorMessage message={errors.title?.message} />
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>
				<ErrorMessage message={errors.description?.message} />
				<Button disabled={isSubmitting}>
					{isSubmitting && <Spinner />}
					Submit New Issue
				</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
