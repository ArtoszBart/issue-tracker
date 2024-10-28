import prisma from '@/config/prismaClient';
import IIssue, { NewIssue, PatchIssue } from '@/models/issue';
import { Status } from '@/models/status';

interface IIssuesListMods {
	status: Status | undefined;
	orderBy: {} | undefined;
	skip: number;
	take: number;
}

export async function getIssues({
	status,
	orderBy,
	skip,
	take,
}: IIssuesListMods): Promise<{ issueCount: number; issues: IIssue[] }> {
	const where = {
		status,
	};
	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip,
		take,
	});

	const issueCount = await prisma.issue.count({
		where,
	});

	const result = {
		issueCount,
		issues,
	};

	return result;
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
