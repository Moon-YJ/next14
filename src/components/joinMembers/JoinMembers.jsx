'use client'; //DB 저장하자마자 정보값을 client의 next-auth와 연동해야하므로 클라이언트 컴포넌트로 작업
import clsx from 'clsx';
import styles from './joinMembers.module.scss';
import { addUsers } from '@/lib/actions';

export default function JoinMembers() {
	return (
		<form className={clsx(styles.joinMembers)} action={addUsers}>
			<input type='text' name='username' placeholder='user name' />
			<input type='text' name='email' placeholder='email' />
			<input type='password' name='password' placeholder='password' />
			<input type='repassword' name='repassword' placeholder='re-password' />

			<input type='reset' value='cancel' />
			<input type='submit' value='register' />
		</form>
	);
}
