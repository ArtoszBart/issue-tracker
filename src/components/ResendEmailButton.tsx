'use client';

import { Button, Spinner } from '@radix-ui/themes';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface IProps {
	userId: string;
}

const ResendEmailButton = ({ userId }: IProps) => {
	const [isResending, setIsResending] = useState(false);

	const resendEmail = () => {
		setIsResending(true);
		axios
			.patch('/api/auth/resend-activation', { id: userId })
			.then(() => toast.success('Activation email has been resent'))
			.catch(() => toast.error('Error resending activation email'))
			.finally(() => setIsResending(false));
	};
	return (
		<>
			<Button onClick={resendEmail}>
				{isResending && <Spinner />}Resend Activation Email
			</Button>
		</>
	);
};

export default ResendEmailButton;
