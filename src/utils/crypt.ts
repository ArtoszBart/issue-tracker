import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(Number(process.env.HASH_ROUNDS));
	const hashedPass = await bcrypt.hash(password, salt);
	return hashedPass;
};

export const comparePassword = async (
	password: string,
	hashedPassword: string
) => {
	const result = await bcrypt.compare(password, hashedPassword);
	return result;
};

export const generateActivationToken = (): string => {
	return crypto.randomBytes(32).toString('hex');
};
