'use client';
// client 방식으로 컴포넌트를 설정해도 초기 한번은 서버쪽에서 랜더링된 다음에 넘어옴
// hydration: 정적인 데이터를 우선 기능없이 미리 서버쪽에서 pre-render해서 출력한 다음, 클라이언트가 동작할 준비가 되면 그때 클라이언트 기능을 활용할 수 있는 동적인 컴포넌트로 변경 처리
// 주의할 점: 서버쪽에서 랜더링된 결과값과 초기 클라이언트에서 동작되는 값이 동일해야됨
// 해결방법1: useEffect로 컴포넌트가 마운트됐을때만 클라이언트에서 활용한 값을 호출
// 해결방법2: Dynamic import방식을 활용해서 client 방식으로 동작하는 컴포넌트를 애초에 서버쪽에서 prebuild 되지 않도록 처리

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav.module.scss';
import { useEffect, useState } from 'react';
import { useCustomText } from '@/hooks/useText';

export default function Nav({ pages }) {
	const pathName = usePathname();
	console.log('nav'); // 브라우저 콘솔창에 찍힘(nav만 동적으로 가져옴)
	const time = new Date().getTime();
	console.log(time, '::time');
	const [Client, setClient] = useState(false);

	const customTxt = useCustomText('combined');

	useEffect(() => {
		setClient(true);
	}, []);

	return (
		<nav className={clsx(styles.nav)}>
			{/* 해결방법1 */}
			{pages.map(page => (
				<Link key={page} href={`/${page}`} className={clsx(pathName === `/${page}` ? styles.on : '')}>
					{customTxt(page)}
				</Link>
			))}
			<p>{Client && time}</p>
		</nav>
	);
}
