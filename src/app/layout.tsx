import AuthProvider from '@/auth/Provider';
import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';
import QueryClientProvider from '@/config/QueryClientProvider';
import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
	title: 'Issue Tracker',
	description: 'Application for efficient issue management',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.variable}>
				<QueryClientProvider>
					<AuthProvider>
						<Theme
							accentColor='violet'
							className={`${inter.variable} min-h-screen flex flex-col`}
						>
							<NavBar />
							<main className='p-5 flex-1 flex flex-col'>
								<Container>{children}</Container>
							</main>
							<Footer />
						</Theme>
					</AuthProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
