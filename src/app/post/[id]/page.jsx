import clsx from 'clsx';
import styles from './postDetail.module.scss';

export default function PostDetail({ params }) {
	return (
		<div className={clsx(styles.postDetail)}>
			<h1>Post Detail</h1>
		</div>
	);
}
