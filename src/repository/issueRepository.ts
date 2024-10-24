import prisma from '@/config/prismaClient';
import IIssue, { NewIssue } from '@/models/issue';

export async function getIssues(): Promise<IIssue[]> {
	return await prisma.issue.findMany();
}

export async function getIssue(id: number): Promise<IIssue | null> {
	return await prisma.issue.findUnique({
		where: {
			id,
		},
	});
}

export async function createIssue(issue: NewIssue): Promise<IIssue> {
	return await prisma.issue.create({
		data: {
			title: issue.title,
			description: issue.description,
		},
	});
}
