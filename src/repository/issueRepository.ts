import prisma from '@/config/prismaClient';
import IIssue, { NewIssue } from '@/models/issue';

export async function createIssue(issue: NewIssue): Promise<IIssue> {
	return await prisma.issue.create({
		data: {
			title: issue.title,
			description: issue.description,
		},
	});
}
