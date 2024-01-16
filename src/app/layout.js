import { Inter } from 'next/font/google';
import '@/styles/globals.scss';
// 해당 경로는 jsconfig.json 파일에 설정되어있음
import Header from '@/components/header/Header';
import { GlobalProvider } from '@/hooks/useGlobalData';
import MobileMenu from '@/components/mobileMenu/MobileMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<GlobalProvider>
					<main className='container'>
						<Header />
						<div className='wrap'>{children}</div>
					</main>
					<MobileMenu />
				</GlobalProvider>
			</body>
		</html>
	);
}
