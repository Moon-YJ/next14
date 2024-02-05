'use client';
import clsx from 'clsx';
import styles from './btnLogin.module.scss';
import Link from 'next/link';
import { handleLogout } from '@/lib/actions';

export default function BtnLogin({ session }) {
	return (
		<>
			{!session ? (
				<Link href='/login' className={clsx(styles.btn, styles.btnLogin)}>
					Login
				</Link>
			) : (
				<form action={handleLogout}>
					<button className={clsx(styles.btn, styles.btnLogout)}>Logout</button>
				</form>
			)}
		</>
	);
}

/*
	헤더에서 호출되는 로그인 버튼 컴포넌트 (compoents > Header.jsx)
	- props로 session정보를 넘겨받아서 세션정보가 없으면 로그인페이지로 이동하는 링크버튼 출력
	- 세션정보가 있으면 handleLogout 서버액션 함수를 호출하는 로그아웃 버튼 출력
	handleLogout (lib > actions.js 참조)
*/
