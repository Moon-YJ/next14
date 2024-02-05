'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { handleLogin } from '@/lib/actions';
import clsx from 'clsx';
import styles from './loginForm.module.scss';

export default function LoginForm() {
	// useFormState를 쓰는 이유
	// 서버액션 함수 실행시 이전 기존 결과값을 state에 자동으로 담아줌으로써
	// 액션실행결과값의 내용을 해당 컴포넌트 화면에서 활용가능
	// 만약 기존 auth설정에서 throw로 Error객체를 던져주면 사용자는 미리 설정한 error.jsx화면을 봐야 되므로
	// 에러 객체를 내보내는 대신 Error객체의 정보만 state로 받아서 error.jsx화면이동없이 에러 내용 확인 가능
	const [state, formAction] = useFormState(handleLogin, undefined);
	return (
		<article className={clsx(styles.loginForm)}>
			<form action={formAction}>
				<input type='text' placeholder='username' name='username' />
				<input type='password' placeholder='password' name='password' />
				<button>Login</button>
				{state?.error}
				<Link href='/join'>
					{"Don't have an account?"} <b>Join</b>
				</Link>
			</form>
		</article>
	);
}

/*
	로그인 페이지에서 호출되는 컴포넌트 (app > (auth) > login > page.jsx에서 호출)
	- 로그인 정보 입력후 로그인 버튼 클릭시 로그인 관련 서버액션 실행 컴포넌트 
	- useFormState 로 handleLogin 서버액션 함수 호출
	- 인증 결과값을 state에 담아 로그인 실패시 강제로 회원가입 페이지로 이동 
	- 로그인 성공시 lib > auth.js(NextAuth), middleware.js를 활용해 강제 메인 페이지로 이동
*/
