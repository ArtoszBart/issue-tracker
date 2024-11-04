import prisma from '@/config/prismaClient';
import Comment, { NewComment } from '@/models/comment';

export async function createComment(comment: NewComment): Promise<Comment> {
	return await prisma.comment.create({
		data: {
			content: comment.content,
			issueId: comment.issueId,
			authorId: comment.authorId,
		},
	});
}
