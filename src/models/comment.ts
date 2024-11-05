import { Comment } from '@prisma/client';
import { z } from 'zod';
import User from './user';

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
export type NewCommentServer = z.infer<typeof newCommentServerSchema>;

export type { Comment as default };

export type CommentWithUser = Comment & {
	author: User;
};
