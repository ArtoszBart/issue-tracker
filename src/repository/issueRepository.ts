import prisma from '@/config/prismaClient';
import IIssue, { NewIssue, PatchIssue } from '@/models/issue';
import { Status } from '@/models/status';

interface IIssuesMods {
	status?: Status;
	orderBy?: {};
	skip?: number;
	take?: number;
	assignedToUser?: boolean;
}

export async function getIssues({
	status,
	orderBy = { createdAt: 'desc' },
	skip,
	take,
	assignedToUser,
}: IIssuesMods = {}): Promise<IIssue[]> {
	return await prisma.issue.findMany({
		orderBy,
		skip,
		take,
		where: {
			status,
		},
		include: {
			assignedToUser,
		},
	});
}

export async function getIssueCount({
	status,
}: IIssuesMods = {}): Promise<number> {
	return await prisma.issue.count({
		where: {
			status,
		},
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
			status: issue.status,
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
