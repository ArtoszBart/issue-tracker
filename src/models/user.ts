import { User } from '@prisma/client';
import { z } from 'zod';

interface IPasswordGuideline {
	value: string;
	text: string;
	regex: RegExp;
}

export const passwordGuidelines: IPasswordGuideline[] = [
	{ value: 'LENGTH', text: 'min. 8 characters', regex: /.{8,}/ },
	{ value: 'UPPERCASE', text: 'one uppercase letter', regex: /[A-Z]/ },
	{ value: 'LOWERCASE', text: 'one lowercase letter', regex: /[a-z]/ },
	{ value: 'DIGIT', text: 'one digit', regex: /[0-9]/ },
	{ value: 'SPECIAL', text: 'one special character', regex: /[\W_]/ },
];

export const newUserSchema = z
	.object({
		name: z
			.string()
			.min(1, 'Name is required')
			.max(30, 'Name can be up to 30 characters'),
		email: z.string().email(),
		password: z
			.string()
			.min(1, 'Password is required')
			.min(8, 'Password must be at least 8 characters long')
			.regex(
				/[A-Z]/,
				'Password must contain at least one uppercase letter'
			)
			.regex(
				/[a-z]/,
				'Password must contain at least one lowercase letter'
			)
			.regex(/[0-9]/, 'Password must contain at least one digit')
			.regex(
				/[\W_]/,
				'Password must contain at least one special character'
			),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export type NewUser = z.infer<typeof newUserSchema>;
export type UserActivation = {
	activationToken: string;
	activationTokenExpiry: Date;
};
export type FinalNewUser = z.infer<typeof newUserSchema> & UserActivation;

export type { User as default };
