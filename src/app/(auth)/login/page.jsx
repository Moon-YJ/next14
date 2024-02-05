import clsx from 'clsx';
import styles from './login.module.scss';
import LoginForm from '@/components/loginForm/LoginForm';
import { handleGithubLogin, handleGoogleLogin } from '@/lib/actions';

export default function Login() {
	return (
		<section className={clsx(styles.login)}>
			<form action={handleGithubLogin}>
				<button>Github Login</button>
			</form>
			<form action={handleGoogleLogin}>
				<button>Google Login</button>
			</form>
			<LoginForm />
		</section>
	);
}

/*
	skip 라우터로 불필요한 url path경로 생략하고 로그인 페이지 컴포넌트 생성
	- github, google 같이 외부 서비스 로그인 기능은 actions.js의 서버액션 함수를 연결
	- 일반 로그인 이벤트는 클라이언트 방식으로 동작해야 함으로 따로 클라이언트 방식 컴포넌트를 제작해서 연동

	handleGithubLogin, handleGoogleLogin
	- lib > actions.js에서 서버액션 함수 참조
	
	LoginForm
	- components > LoginForm.jsx에서 참조
*/
