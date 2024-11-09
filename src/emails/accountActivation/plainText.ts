import { IAccountActivationEmail } from '.';

const plainText = (payload: IAccountActivationEmail) => {
	return `
		Hi ${payload.name},

		Thank you for signing up with Issue Tracker! To complete your registration and activate your account, please click the link below:

		${process.env.BASE_URL}/activation?id=${payload.id}&token=${payload.activationToken}

		**Please note:** This activation link will be active for only 15 minutes. If the link expires, you can click it again, and you will be given the option to request a new activation link.

		If the link doesn't work, you can copy and paste it into your browser.
		Once your account is activated, you'll be able to log in and enjoy all the features of Issue Tracker.

		If you did not create an account, please ignore this email.

		Thanks,  
		Bartosz Art
	`;
};

export default plainText;
