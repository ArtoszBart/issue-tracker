import prisma from '@/config/prismaClient';
import Issue, { IssueWithComments, NewIssue, PatchIssue } from '@/models/issue';
import Status from '@/models/status';

interface IIssuesMods {
	status?: Status;
	assignedToUserId?: string;
	orderBy?: { [issueField: string]: string };
	skip?: number;
	take?: number;
	assignedToUser?: boolean;
}

export async function getIssues({
	status,
	assignedToUserId,
	orderBy = { createdAt: 'desc' },
	skip,
	take,
	assignedToUser,
}: IIssuesMods = {}): Promise<Issue[]> {
	return await prisma.issue.findMany({
		orderBy,
		skip,
		take,
		where: {
			status,
			assignedToUserId,
		},
		include: {
			assignedToUser,
		},
	});
}

export async function getIssueCount({
	status,
	assignedToUserId,
}: IIssuesMods = {}): Promise<number> {
	return await prisma.issue.count({
		where: {
			status,
			assignedToUserId,
		},
	});
}

export async function getIssue(id: number): Promise<IssueWithComments | null> {
	return await prisma.issue.findUnique({
		where: {
			id,
		},
		include: {
			comments: {
				orderBy: { createdAt: 'asc' },
				include: { author: true },
			},
		},
	});
}

export async function createIssue(issue: NewIssue): Promise<Issue> {
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
): Promise<Issue> {
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

export async function deleteIssue(id: number) {
	return prisma.$transaction([
		prisma.comment.deleteMany({
			where: {
				issueId: id,
			},
		}),
		prisma.issue.delete({
			where: {
				id,
			},
		}),
	]);
}
