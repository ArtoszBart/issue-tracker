import { getEmailVariants } from '@/emails/accountActivation';
import sendEmail from '@/emails/resendClient';
import {
	getUserById,
	updateActivationToken,
} from '@/repository/userRepository';
import { generateActivationToken, hashData } from '@/utils/crypt';
import moment from 'moment';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
	const body = await request.json();

	const user = await getUserById(body.id);
	if (!user)
		return NextResponse.json({ error: 'Invalid user' }, { status: 404 });

	const updatedUser = await updateActivationToken(user.id, {
		activationToken: await hashData(generateActivationToken()),
		activationTokenExpiry: moment(new Date()).add(15, 'm').toDate(),
	});

	try {
		await sendEmail({
			email: updatedUser.email!,
			...getEmailVariants({
				id: updatedUser.id!,
				name: updatedUser.name!,
				activationToken: updatedUser.activationToken!,
			}),
		});
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}

	return NextResponse.json({}, { status: 200 });
}
