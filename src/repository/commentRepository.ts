import prisma from '@/config/prismaClient';
import Comment, { NewCommentServer } from '@/models/comment';

export async function createComment(
	comment: NewCommentServer
): Promise<Comment> {
	return await prisma.comment.create({
		data: {
			content: comment.content,
			issueId: comment.issueId,
			authorId: comment.authorId,
		},
	});
}
