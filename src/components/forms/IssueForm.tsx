'use client';

import 'easymde/dist/easymde.min.css';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import IIssue, { NewIssue, issueSchema } from '@/models/issue';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/forms/ErrorMessage';
import { Spinner } from '@/components';
import SimpleMDE from 'react-simplemde-editor';

interface IProps {
	issue?: IIssue;
}

const IssueForm = ({ issue }: IProps) => {
	const router = useRouter();
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<NewIssue>({
		resolver: zodResolver(issueSchema),
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			setIsSubmitting(true);

			if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
			else await axios.post('/api/issues', data);

			router.push('/issues');
			router.refresh();
		} catch (error) {
			setIsSubmitting(false);
			setError('An unexpected error occured.');
			console.error(error);
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
				<TextField.Root
					placeholder='Title'
					defaultValue={issue?.title}
					{...register('title')}
				/>
				<ErrorMessage message={errors.title?.message} />
				<Controller
					name='description'
					control={control}
					defaultValue={issue?.description}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>
				<ErrorMessage message={errors.description?.message} />
				<Button disabled={isSubmitting}>
					{isSubmitting && <Spinner />}
					{issue ? 'Update Issue' : 'Submit New Issue'}
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;