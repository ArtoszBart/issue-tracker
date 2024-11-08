const plainText = (name: string) => {
	return `Hi ${name},

		Thank you for signing up with Issue Tracker! To complete your registration and activate your account, please click the link below:

		${process.env.BASE_URL}/TODO:${Math.random()}

		If the link doesn't work, you can copy and paste it into your browser.
		Once your account is activated, you'll be able to log in and enjoy all the features of Issue Tracker.

		If you did not create an account, please ignore this email.

		Thanks,
		Bartosz Art
		`;
};

export default plainText;
