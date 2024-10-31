import prisma from '@/config/prismaClient';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/repository/userRepository';
import { comparePassword } from '@/utils/crypt';

const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'Email' },
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) return null;

				const user = await getUserByEmail(credentials?.email);
				if (!user) return null;

				const passwordMatch = await comparePassword(
					credentials.password,
					user.hashedPassword!
				);

				return passwordMatch ? user : null;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
		}),
	],
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/signin',
		signOut: '/signout',
	},
};

export default authOptions;
