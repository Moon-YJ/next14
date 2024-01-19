import clsx from 'clsx';
import styles from './login.module.scss';
import LoginForm from '@/components/loginForm/LoginForm';
import { handleGithubLogin } from '@/lib/actions';

export default function Login() {
	return (
		<section className={clsx(styles.login)}>
			<form action={handleGithubLogin}>
				<button>Github Login</button>
			</form>
			<LoginForm />
		</section>
	);
}
