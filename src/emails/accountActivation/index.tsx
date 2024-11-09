import AccountActivation from './AccountActivation';
import plainText from './plainText';

export interface IAccountActivationEmail {
	id: string;
	name: string;
	activationToken: string;
}

export const getEmailVariants = (payload: IAccountActivationEmail) => {
	return {
		subject: 'Activate Your Account on Issue Tracker',
		react: (
			<AccountActivation
				name={payload.name}
				id={payload.id}
				activationToken={payload.activationToken}
			/>
		),
		text: plainText(payload),
	};
};
