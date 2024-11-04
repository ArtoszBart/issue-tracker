'use client';

import 'easymde/dist/easymde.min.css';
import { Avatar, Box, Button, Flex, Heading } from '@radix-ui/themes';
import PlaceholderImage from '@/assets/placeholder.png';
import { Controller } from 'react-hook-form';
import ErrorMessage from '@/components/forms/ErrorMessage';
import { Spinner } from '@/components';
import SimpleMDE from 'react-simplemde-editor';
import useCommentForm from './useCommentForm';

interface IProps {
	issueId: number;
}

const CommentForm = ({ issueId }: IProps) => {
	const hook = useCommentForm(issueId);

	return (
		<Box className='space-y-5'>
			<Heading size='4' as='h2'>
				Add a comment
			</Heading>
			<Box>
				<Flex className='w-full gap-4'>
					<Box className='pt-2.5'>
						<Avatar
							src={
								hook.sesison?.user.image || PlaceholderImage.src
							}
							fallback='?'
							size='2'
							radius='full'
						/>
					</Box>
					<form className='w-full' onSubmit={hook.sendComment}>
						<Controller
							name='content'
							control={hook.control}
							defaultValue=''
							render={({ field }) => (
								<SimpleMDE
									options={hook.mdeOptions}
									placeholder='Add your comment here...'
									{...field}
								/>
							)}
						/>
						<ErrorMessage message={hook.errors.content?.message} />
						<Button disabled={hook.isSubmitting}>
							{hook.isSubmitting && <Spinner />} Comment
						</Button>
					</form>
				</Flex>
			</Box>
		</Box>
	);
};

export default CommentForm;
