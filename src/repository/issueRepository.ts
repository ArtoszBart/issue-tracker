import prisma from '@/config/prismaClient';
import IIssue, { NewIssue, PatchIssue } from '@/models/issue';
import { Status } from '@/models/status';

interface IIssuesListMods {
	status: Status | undefined;
	orderBy: {} | undefined;
}

export async function getIssues({
	status,
	orderBy,
}: IIssuesListMods): Promise<IIssue[]> {
	return await prisma.issue.findMany({
		where: {
			status,
		},
		orderBy,
	});
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

export async function updateIssue(
	id: number,
	issue: PatchIssue
): Promise<IIssue> {
	return await prisma.issue.update({
		where: { id },
		data: {
			title: issue.title,
			description: issue.description,
			assignedToUserId: issue.assignedToUserId,
		},
	});
}

export async function deleteIssue(id: number): Promise<IIssue> {
	return await prisma.issue.delete({
		where: {
			id,
		},
	});
}
