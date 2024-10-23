import { NextRequest, NextResponse } from 'next/server';
import { createIssueSchema } from '@/models/issue';
import { createIssue } from '@/repository/issueRepository';

export async function POST(request: NextRequest) {
	const body = await request.json();

	const validation = createIssueSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });

	const newIssue = await createIssue(body);

	return NextResponse.json(newIssue, { status: 201 });
}
