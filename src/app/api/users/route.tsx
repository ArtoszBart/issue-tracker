import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '@/repository/userRepository';

export async function GET(request: NextRequest) {
	const users = await getUsers();

	return NextResponse.json(users);
}
