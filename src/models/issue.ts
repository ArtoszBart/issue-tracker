import { z } from 'zod';
import { Status } from './status';

export interface ICreateIssue {
	title: string;
	description: string;
}

export default interface IIssue extends ICreateIssue {
	id: number;
	status: Status;
	createdAt: Date;
	updatedAt: Date;
}

export const createIssueSchema = z.object({
	title: z.string().min(1).max(255),
	description: z.string().min(1),
});
