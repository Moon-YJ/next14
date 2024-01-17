import clsx from 'clsx';
import styles from './write.module.scss';
import { addPosts } from '@/lib/actions';

export default function Write() {
	return (
		<section className={clsx(styles.write)}>
			<h1>Write New Posts</h1>
			<form action={addPosts}>
				<input type='text' placeholder='title' name='title' />
				<input type='text' placeholder='image URL' name='img' />
				<textarea name='desc' cols={30} placeholder='description' />
				<nav>
					<input type='reset' value='cancel' />
					<input type='submit' value='send' />
				</nav>
			</form>
		</section>
	);
}
