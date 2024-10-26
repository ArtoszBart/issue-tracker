import prisma from '@/config/prismaClient';
import User from '@/models/user';

export async function getUsers(): Promise<User[]> {
	return await prisma.user.findMany({
		orderBy: {
			name: 'asc',
		},
	});
}

export async function getUser(id: string): Promise<User | null> {
	return await prisma.user.findUnique({
		where: {
			id,
		},
	});
}
