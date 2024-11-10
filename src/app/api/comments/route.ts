import authOptions from '@/auth/authOptions';
import { newCommentServerSchema } from '@/models/comment';
import { createComment } from '@/repository/commentRepository';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);
	if (!session) return NextResponse.json({}, { status: 401 });

	const body = { ...(await request.json()), authorId: session?.user?.id };

	const validation = newCommentServerSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 });

	await createComment(body);

	return NextResponse.json({}, { status: 201 });
}
