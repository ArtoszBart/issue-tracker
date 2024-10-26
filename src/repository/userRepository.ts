import prisma from '@/config/prismaClient';
import User from '@/models/user';

export async function getUsers(): Promise<User[]> {
	return await prisma.user.findMany({
		orderBy: {
			name: 'asc',
		},
	});
}
