import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const hashData = async (data: string) => {
	const salt = await bcrypt.genSalt(Number(process.env.HASH_ROUNDS));
	const hashedPass = await bcrypt.hash(data, salt);
	return hashedPass;
};

export const compareHashedData = async (data: string, hashedData: string) => {
	const result = await bcrypt.compare(data, hashedData);
	return result;
};

export const generateActivationToken = (): string => {
	return crypto.randomBytes(32).toString('hex');
};
