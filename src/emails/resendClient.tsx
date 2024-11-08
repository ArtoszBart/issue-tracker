import { ReactNode } from 'react';
import { CreateEmailResponseSuccess, Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface IEmailData {
	email: string;
	subject: string;
	react: ReactNode;
	text: string;
}

export default async function sendEmail({
	email,
	subject,
	react,
	text,
}: IEmailData): Promise<CreateEmailResponseSuccess | null> {
	const { data, error } = await resend.emails.send({
		from: process.env.EMAIL_HOST!,
		to: [email],
		subject: subject,
		react: react,
		text: text,
	});

	if (error || !data) {
		console.error(error);
		throw new Error(error?.message || 'No response data');
	}

	return data;
}
