import { issueSchema } from '@/models/issue';
import {
	deleteIssue,
	getIssue,
	updateIssue,
} from '@/repository/issueRepository';
import { NextRequest, NextResponse } from 'next/server';

interface IProps {
	params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: IProps) {
	const body = await request.json();

	const validation = issueSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 });

	const id = Number(params.id);
	if (isNaN(id))
		return NextResponse.json({ error: 'Invalid issue' }, { status: 400 });

	const issue = await getIssue(id);
	if (!issue)
		return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

	const updatedIssue = await updateIssue(id, body);

	return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: IProps) {
	const id = Number(params.id);
	if (isNaN(id))
		return NextResponse.json({ error: 'Invalid issue' }, { status: 400 });

	const issue = await getIssue(id);
	if (!issue)
		return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

	await deleteIssue(id);

	return NextResponse.json({});
}
