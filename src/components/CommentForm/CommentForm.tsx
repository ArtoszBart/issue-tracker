'use client';

import { Avatar, Box, Button, Flex, Heading, Text } from '@radix-ui/themes';
import PlaceholderImage from '@/assets/placeholder.png';
import { Controller } from 'react-hook-form';
import ErrorMessage from '@/components/forms/ErrorMessage';
import { Link, Spinner } from '@/components';
import useCommentForm from './useCommentForm';
import MDEditor from '../MDEditor';

interface IProps {
	issueId: number;
}

const CommentForm = ({ issueId }: IProps) => {
	const hook = useCommentForm(issueId);

	return (
		<Box className='space-y-5 flex flex-col'>
			<Heading size='4' as='h2'>
				Add a comment
			</Heading>
			{!hook.sesison ? (
				<>
					<Text className='text-center'>
						You must be logged in to leave a comment. Please{' '}
						<Link href='/api/auth/signin'>sign in</Link> or{' '}
						<Link href='/'>create an account</Link> to share your
						thoughts!
					</Text>
				</>
			) : (
				<Box>
					<Flex className='w-full gap-4'>
						<Box className='pt-2.5'>
							<Avatar
								src={
									hook.sesison.user.image ||
									PlaceholderImage.src
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
									<MDEditor
										options={hook.mdeOptions}
										placeholder='Add your comment here...'
										{...field}
									/>
								)}
							/>
							<ErrorMessage
								message={hook.errors.content?.message}
							/>
							<Button disabled={hook.isSubmitting}>
								{hook.isSubmitting && <Spinner />} Comment
							</Button>
						</form>
					</Flex>
				</Box>
			)}
		</Box>
	);
};

export default CommentForm;
