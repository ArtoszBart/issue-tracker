import AccountActivation from './AccountActivation';
import plainText from './plainText';

export interface IAccountActivationEmail {
	name: string;
	email: string;
	activationToken: string;
}

export const getEmailVariants = (payload: IAccountActivationEmail) => {
	return {
		subject: 'Activate Your Account on Issue Tracker',
		react: (
			<AccountActivation
				name={payload.name}
				email={payload.email}
				activationToken={payload.activationToken}
			/>
		),
		text: plainText(payload),
	};
};
