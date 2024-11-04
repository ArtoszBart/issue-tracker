import { NewCommentForm, newCommentFormSchema } from '@/models/comment';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const useCommentForm = (issueId: number) => {
	const router = useRouter();
	const { data: sesison } = useSession();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		setValue,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<NewCommentForm>({
		resolver: zodResolver(newCommentFormSchema),
	});

	const mdeOptions = useMemo(() => {
		return {
			maxHeight: '10rem',
		};
	}, []);

	const sendComment = handleSubmit(({ content }) => {
		setIsSubmitting(true);
		const payload = {
			content,
			issueId,
		};

		axios
			.post(`/api/comments`, payload)
			.then(() => {
				toast.success('Comment added successfully!');
				router.refresh();
				setValue('content', '');
			})
			.catch(() => {
				toast.error('Failed to add comment. Please try again.');
			})
			.finally(() => setIsSubmitting(false));
	});

	return { sesison, sendComment, control, mdeOptions, errors, isSubmitting };
};

export default useCommentForm;
