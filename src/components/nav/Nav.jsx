'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav.module.scss';

export default function Nav({ pages }) {
	const pathName = usePathname();
	console.log('nav'); // 브라우저 콘솔창에 찍힘(nav만 동적으로 가져옴)

	return (
		<nav className={clsx(styles.nav)}>
			{pages.map(page => (
				<Link key={page} href={`/${page}`} className={clsx(pathName === `/${page}` ? styles.on : '')}>
					{page.charAt(0).toUpperCase() + page.slice(1)}
				</Link>
			))}
		</nav>
	);
}
