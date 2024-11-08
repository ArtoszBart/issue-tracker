import { getEmailVariants } from '@/emails/accountActivation';
import sendEmail from '@/emails/resendClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();
	try {
		const data = await sendEmail({
			email: body.email,
			...getEmailVariants(body.name),
		});

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
