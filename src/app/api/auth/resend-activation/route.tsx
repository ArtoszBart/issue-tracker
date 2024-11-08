import { getEmailVariants } from '@/emails/accountActivation';
import sendEmail from '@/emails/resendClient';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();
	try {
		const data = await sendEmail({
			email: body.email,
			...getEmailVariants(body.name),
		});

		return Response.json(data);
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
