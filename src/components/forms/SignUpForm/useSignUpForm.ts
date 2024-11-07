import { NewUser, newUserSchema, passwordGuidelines } from '@/models/user';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

const useSignUpForm = () => {
	const router = useRouter();
	const [error, setError] = useState('');
	const [passwordContent, setPasswordContent] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register: orginalRegister,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<NewUser>({
		resolver: zodResolver(newUserSchema),
	});

	const register = (inputName: keyof NewUser) => {
		if (inputName !== 'password') return orginalRegister(inputName);

		const passwordFieldSet = orginalRegister(inputName);
		const onChange = (e: ChangeEvent<HTMLInputElement>) => {
			passwordFieldSet.onChange(e);
			const password = e.target.value;
			const newPasswordContent: string[] = [];

			passwordGuidelines.forEach(
				(pg) =>
					pg.regex.test(password) && newPasswordContent.push(pg.value)
			);

			setPasswordContent(newPasswordContent);
		};

		return { ...passwordFieldSet, onChange };
	};

	const onSubmit = handleSubmit(async (data) => {
		try {
			setIsSubmitting(true);

			await axios.post('/api/users', data);

			router.push('/registration-confirmation');
		} catch (error) {
			setIsSubmitting(false);
			setError('An unexpected error occured.');
			console.error(error);
		}
	});

	return {
		error,
		onSubmit,
		register,
		errors,
		control,
		isSubmitting,
		passwordContent,
		passwordGuidelines,
	};
};

export default useSignUpForm;
