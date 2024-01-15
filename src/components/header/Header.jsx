import clsx from 'clsx';
import styles from './header.module.scss';
import Link from 'next/link';
import Nav from '../nav/Nav.jsx';

export default function Header() {
	console.log('header'); // 서버 터미널에 찍힘
	return (
		<header className={clsx(styles.header)}>
			<h1>
				<Link href='/'>ABC Company</Link>
			</h1>

			<nav>
				<Nav pages={['about', 'youtube', 'post']} />
			</nav>
		</header>
	);
}
