import { getEmailVariants } from '@/emails/accountActivation';
import sendEmail from '@/emails/resendClient';
import { FinalNewUser, newUserSchema } from '@/models/user';
import { createUser, getUsers } from '@/repository/userRepository';
import { generateActivationToken, hashData } from '@/utils/crypt';
import moment from 'moment';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
	const users = await getUsers();

	return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
	const body: FinalNewUser = await request.json();

	const validation = newUserSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 });

	const newUserData: FinalNewUser = {
		...body,
		email: body.email.toLowerCase(),
		password: await hashData(body.password),
		activationToken: await hashData(generateActivationToken()),
		activationTokenExpiry: moment(new Date()).add(15, 'm').toDate(),
	};

	const newUser = await createUser(newUserData);
	if (!newUser.id) return NextResponse.json({}, { status: 500 });

	try {
		await sendEmail({
			email: newUser.email!,
			...getEmailVariants({
				id: newUser.id!,
				name: newUser.name!,
				activationToken: newUser.activationToken!,
			}),
		});
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}

	return NextResponse.json(newUser, { status: 201 });
}
