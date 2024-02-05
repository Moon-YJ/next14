import clsx from 'clsx';
import styles from './header.module.scss';
import Link from 'next/link';
import Nav from '../nav/Nav.jsx';
import BtnLogin from '../btnLogin/BtnLogin';
import BtnMobileMenu from '../btnMobileMenu/BtnMobileMenu';
import { auth } from '@/lib/auth';
//import dynamic from 'next/dynamic';

// 해결방법2: 기존 client 방식의 컴포넌트 import시 ssr: false를 통해 서버쪽에서 pre-build 되지 않도록 설정 (build 자체를 하지 않아서 사용자가 빈 화면을 보게 되므로 해결방법1 사용 권장)
//const NoSsrNav = dynamic(() => import('@/components/nav/Nav'), { ssr: false });

export default async function Header() {
	//console.log('header'); // 서버 터미널에 찍힘
	const session = await auth();
	return (
		<header className={clsx(styles.header)}>
			<h1>
				<Link href='/'>ABC Company</Link>
			</h1>

			<Nav pages={session?.user ? ['about', 'youtube', 'post'] : ['about', 'youtube', 'join']} session={session} />
			{/* <NoSsrNav pages={['about', 'youtube', 'post']} /> */}
			<BtnLogin session={session} />
			<BtnMobileMenu />
		</header>
	);
}

/*
	메인 레이아웃 페이지 전역에서 호출되는 헤더 컴포넌트 (app > layout.jsx에서 호출됨)
	- sever방식으로 렌더링
	- 주메뉴, 로그인버튼, 토글메뉴 컴포넌트 출력
	- 인증 정보를 받아서 session정보를 주메뉴, 로그인버튼에 props로 전달
*/
