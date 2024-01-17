import clsx from 'clsx';
import styles from './edit.module.scss';

export default function Edit({ params }) {
	const { id } = params;
	return (
		<div className={clsx(styles.edit)}>
			<h1>Edit Post</h1>
			<p>{id}</p>
		</div>
	);
}
