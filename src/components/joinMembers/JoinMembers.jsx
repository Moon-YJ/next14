'use client';
import clsx from 'clsx';
import styles from './joinMembers.module.scss';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addUser } from '@/lib/actions';

export default function JoinMembers() {
	const [state, formAction] = useFormState(addUser, undefined);
	const router = useRouter();

	useEffect(() => {
		state?.success && router.push('/login');
	}, [state?.success, router]);

	return (
		<form className={clsx(styles.joinMembers)} action={formAction}>
			<input type='text' name='username' placeholder='user name' />
			<input type='email' name='email' placeholder='email' />
			<input type='password' name='password' placeholder='password' />
			<input type='password' name='repassword' placeholder='re-password' />

			<input type='reset' value='cancel' />
			<input type='submit' value='register' />
			{state?.error}
		</form>
	);
}

/*
	회원가입페이지에서 호출되는 회원가입정보 입력 폼 컴포넌트 (app > (auth) > join > page.jsx 에서 호출됨)
	- 회원정보 입력후 전송시 addUser 서버액션 함수 호출해서 DB에 회원정보 저장
	- useFormState훅을 활용하여 해당 훅이 대신 addUser서버액션을 실행하게 하고 인증결과값을 컴포넌트의 state에 담아줌
	- useFormState로 넘겨받은 state의 정보값이 회원가입 성공이면 로그인 페이지 이동
	- 넘겨받은 state의 정보값이 회원가입 실패이면 실패 메세지 화면에 렌더링
	addUser (lib > actions.js에서 참조)
*/
