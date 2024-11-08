import AccountActivation from './AccountActivation';
import plainText from './plainText';

export const getEmailVariants = (name: string) => ({
	subject: 'Activate Your Account on Issue Tracker',
	react: <AccountActivation name={name} />,
	text: plainText(name),
});
