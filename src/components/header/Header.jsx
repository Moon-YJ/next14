import clsx from 'clsx';
import styles from './header.module.scss';
import Link from 'next/link';
import Nav from '../nav/Nav.jsx';
import BtnLogin from '../btnLogin/BtnLogin';
//import dynamic from 'next/dynamic';

// 해결방법2: 기존 client 방식의 컴포넌트 import시 ssr: false를 통해 서버쪽에서 pre-build 되지 않도록 설정 (build 자체를 하지 않아서 사용자가 빈 화면을 보게 되므로 해결방법1 사용 권장)
//const NoSsrNav = dynamic(() => import('@/components/nav/Nav'), { ssr: false });

export default function Header() {
	console.log('header'); // 서버 터미널에 찍힘
	return (
		<header className={clsx(styles.header)}>
			<h1>
				<Link href='/'>ABC Company</Link>
			</h1>

			<Nav pages={['about', 'youtube', 'post']} />
			{/* <NoSsrNav pages={['about', 'youtube', 'post']} /> */}
			<BtnLogin session={true} />
		</header>
	);
}
