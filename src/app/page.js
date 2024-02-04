import styles from './main.module.scss';
import clsx from 'clsx';

export default function Home() {
	return (
		<main className={clsx(styles.main)}>
			<h1>Main</h1>
		</main>
	);
}

/*
	메인 페이지에 전용으로 보여줄 컴포넌트 layout.jsx의 children으로 출력될 페이지
*/
