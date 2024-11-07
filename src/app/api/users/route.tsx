import { newUserSchema } from '@/models/user';
import { createUser, getUsers } from '@/repository/userRepository';
import { hashPassword } from '@/utils/crypt';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
	const users = await getUsers();

	return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
	const body = await request.json();

	const validation = newUserSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 });

	body.password = await hashPassword(body.password);

	const newUser = await createUser(body);

	return NextResponse.json(newUser, { status: 201 });
}
