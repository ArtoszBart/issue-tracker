import authOptions from '@/auth/authOptions';
import { patchIssueSchema } from '@/models/issue';
import Status from '@/models/status';
import {
	deleteIssue,
	getIssue,
	updateIssue,
} from '@/repository/issueRepository';
import { getUserById } from '@/repository/userRepository';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface IProps {
	params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: IProps) {
	const session = await getServerSession(authOptions);
	if (!session) return NextResponse.json({}, { status: 401 });

	const body = await request.json();

	const validation = patchIssueSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 });

	const { status } = body;
	if (status) {
		const statuses = Object.keys(Status);
		if (!statuses.includes(status))
			return NextResponse.json(
				{ error: 'Invalid status' },
				{ status: 400 }
			);
	}

	const { assignedToUserId } = body;
	if (assignedToUserId) {
		const user = await getUserById(assignedToUserId);
		if (!user)
			return NextResponse.json(
				{ error: 'Invalid user.' },
				{ status: 400 }
			);
		else body.status = 'IN_PROGRESS';
	}

	const id = Number(params.id);
	if (isNaN(id))
		return NextResponse.json({ error: 'Invalid issue' }, { status: 400 });

	const issue = await getIssue(id);
	if (!issue)
		return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

	await updateIssue(id, body);

	return NextResponse.json({});
}

export async function DELETE(request: NextRequest, { params }: IProps) {
	const session = await getServerSession(authOptions);
	if (!session) return NextResponse.json({}, { status: 401 });

	const id = Number(params.id);
	if (isNaN(id))
		return NextResponse.json({ error: 'Invalid issue' }, { status: 400 });

	const issue = await getIssue(id);
	if (!issue)
		return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

	await deleteIssue(id);

	return NextResponse.json({});
}
