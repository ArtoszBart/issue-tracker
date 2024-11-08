import prisma from '@/config/prismaClient';
import User, { FinalNewUser, UserActivation } from '@/models/user';

export async function getUsers(): Promise<User[]> {
	return await prisma.user.findMany({
		orderBy: {
			name: 'asc',
		},
	});
}

export async function getUserById(id: string): Promise<User | null> {
	return await prisma.user.findUnique({
		where: {
			id,
		},
	});
}

export async function getUserByEmail(email: string): Promise<User | null> {
	return await prisma.user.findUnique({
		where: {
			email,
		},
	});
}

export async function createUser(user: FinalNewUser): Promise<User> {
	return await prisma.user.create({
		data: {
			name: user.name,
			email: user.email,
			hashedPassword: user.password,
			activationToken: user.activationToken,
			activationTokenExpiry: user.activationTokenExpiry,
		},
	});
}

export async function updateUser(
	id: string,
	user: UserActivation
): Promise<User> {
	return await prisma.user.update({
		where: { id },
		data: {
			activationToken: user.activationToken,
			activationTokenExpiry: user.activationTokenExpiry,
		},
	});
}
