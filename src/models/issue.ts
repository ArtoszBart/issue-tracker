import User from '@/models/user';
import { z } from 'zod';
import { CommentWithUser } from './comment';
import Status from './status';

export const issueSchema = z.object({
	title: z.string().min(1, 'Title is required').max(255),
	description: z.string().min(1, 'Description is required').max(65535),
});

export const patchIssueSchema = z.object({
	title: z.string().min(1, 'Title is required').max(255).optional(),
	description: z
		.string()
		.min(1, 'Description is required')
		.max(65535)
		.optional(),
	assignedToUserId: z
		.string()
		.min(1, 'AssignedToUserId is required.')
		.max(255)
		.optional()
		.nullable(),
	status: z.enum(Object.values(Status) as [Status, ...Status[]]).optional(),
});

export type NewIssue = z.infer<typeof issueSchema>;
export type PatchIssue = z.infer<typeof patchIssueSchema>;

export type Issue = PatchIssue & {
	id: number;
	status: Status;
	createdAt: Date;
	updatedAt: Date;
	assignedToUser?: User | null;
	comments?: CommentWithUser[];
};

export type { Issue as default };
