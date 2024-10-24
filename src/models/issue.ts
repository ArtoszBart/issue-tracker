import { z } from 'zod';
import { Status } from './status';

export const issueSchema = z.object({
	title: z.string().min(1, 'Title is required').max(255),
	description: z.string().min(1, 'Description is required'),
});

export type NewIssue = z.infer<typeof issueSchema>;

export default interface IIssue extends NewIssue {
	id: number;
	status: Status;
	createdAt: Date;
	updatedAt: Date;
}
