import prisma from '@/config/prismaClient';
import IIssue, { ICreateIssue } from '@/models/issue';

export async function createIssue(issue: ICreateIssue): Promise<IIssue> {
	return await prisma.issue.create({
		data: {
			title: issue.title,
			description: issue.description,
		},
	});
}
