import { NewIssue, issueSchema } from '@/models/issue';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useIssueForm = (issueId: number | undefined) => {
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

			if (issueId) await axios.patch(`/api/issues/${issueId}`, data);
			else await axios.post('/api/issues', data);

			router.push('/issues');
			router.refresh();
		} catch (error) {
			setIsSubmitting(false);
			setError('An unexpected error occured.');
			console.error(error);
		}
	});

	return { error, onSubmit, register, errors, control, isSubmitting };
};

export default useIssueForm;
