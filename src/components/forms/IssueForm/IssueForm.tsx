'use client';

import { Spinner } from '@/components';
import ErrorMessage from '@/components/forms/ErrorMessage';
import MDEditor from '@/components/MDEditor';
import IIssue from '@/models/issue';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { Controller } from 'react-hook-form';
import useIssueForm from './useIssueForm';

interface IProps {
	issue?: IIssue;
}

const IssueForm = ({ issue }: IProps) => {
	const hook = useIssueForm(issue?.id);
	return (
		<div className='max-w-xl'>
			{hook.error && (
				<Callout.Root color='red' className='mb-5'>
					<Callout.Text>{hook.error}</Callout.Text>
				</Callout.Root>
			)}

			<form className='space-y-3' onSubmit={hook.onSubmit}>
				<TextField.Root
					placeholder='Title'
					defaultValue={issue?.title}
					{...hook.register('title')}
				/>
				<ErrorMessage message={hook.errors.title?.message} />
				<Controller
					name='description'
					control={hook.control}
					defaultValue={issue?.description}
					render={({ field }) => (
						<MDEditor placeholder='Description' {...field} />
					)}
				/>
				<ErrorMessage message={hook.errors.description?.message} />
				<Button disabled={hook.isSubmitting}>
					{hook.isSubmitting && <Spinner />}
					{issue ? 'Update Issue' : 'Submit New Issue'}
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;
