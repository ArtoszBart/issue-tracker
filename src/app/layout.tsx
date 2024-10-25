import '@radix-ui/themes/styles.css';
import './globals.scss';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import NavBar from '@/components/layout/NavBar';
import { Container, Theme } from '@radix-ui/themes';
import AuthProvider from '@/auth/Provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.variable}>
				<AuthProvider>
					<Theme accentColor='violet'>
						<NavBar />
						<main className='p-5'>
							<Container>{children}</Container>
						</main>
					</Theme>
				</AuthProvider>
			</body>
		</html>
	);
}
