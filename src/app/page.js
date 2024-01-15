import styles from './main.module.scss';
import clsx from 'clsx';

export default function Home() {
	return (
		<main className={clsx(styles.main)}>
			<h1>Main</h1>
		</main>
	);
}
