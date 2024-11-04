import { Comment } from '@prisma/client';
import User from './user';
import { z } from 'zod';

export const newCommentFormSchema = z.object({
	content: z
		.string()
		.min(1, 'Comment cannot be empty')
		.max(65535, 'Comment must be at most 65,535 characters long'),
});

export const newCommentServerSchema = newCommentFormSchema.extend({
	issueId: z.number().int().positive(),
	authorId: z.string(),
});

export type NewCommentForm = z.infer<typeof newCommentFormSchema>;
export type NewComment = z.infer<typeof newCommentServerSchema>;

export type { Comment as default };
export interface ICommentUser extends Comment {
	author: User;
}
