import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '@/models/issue';
import { createIssue } from '@/repository/issueRepository';
import { getServerSession } from 'next-auth';
import authOptions from '@/auth/authOptions';

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);
	if (!session) return NextResponse.json({}, { status: 401 });

	const body = await request.json();

	const validation = issueSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 });

	await createIssue(body);

	return NextResponse.json({}, { status: 201 });
}
