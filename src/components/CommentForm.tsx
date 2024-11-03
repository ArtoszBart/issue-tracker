'use client';

import 'easymde/dist/easymde.min.css';
import { Avatar, Box, Button, Flex, Heading } from '@radix-ui/themes';
import PlaceholderImage from '@/assets/placeholder.png';
import { useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NewIssue, issueSchema } from '@/models/issue';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/forms/ErrorMessage';
import { Spinner } from '@/components';
import SimpleMDE from 'react-simplemde-editor';

const CommentForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<NewIssue>({
		resolver: zodResolver(issueSchema),
	});

	const mdeOptions = useMemo(() => {
		return {
			maxHeight: '10rem',
		};
	}, []);

	return (
		<Box className='space-y-5'>
			<Heading size='4' as='h2'>
				Add a comment
			</Heading>
			<Box>
				<Flex className='w-full gap-4'>
					<Box className='pt-2.5'>
						<Avatar
							src={PlaceholderImage.src}
							fallback='?'
							size='2'
							radius='full'
						/>
					</Box>
					<form className='w-full' onSubmit={() => {}}>
						<Controller
							name='description'
							control={control}
							render={({ field }) => (
								<SimpleMDE
									options={mdeOptions}
									placeholder='Description'
									{...field}
								/>
							)}
						/>
						<ErrorMessage message={errors.description?.message} />
						<Button disabled={isSubmitting}>
							{isSubmitting && <Spinner />} Comment
						</Button>
					</form>
				</Flex>
			</Box>
		</Box>
	);
};

export default CommentForm;
