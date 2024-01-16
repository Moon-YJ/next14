import clsx from 'clsx';
import styles from './postDetail.module.scss';
import { getPosts } from '@/lib/actions';
import Image from 'next/image';

export default async function PostDetail({ params }) {
	const post = await getPosts(params.id);
	console.log(post);
	return (
		<div className={clsx(styles.postDetail)}>
			<h1>Post Detail</h1>
			<article key={post._id}>
				<div className={clsx(styles.pic)}>
					{post.img && <Image src={post.img} alt={post.title} priority fill sizes='(max-width: 768px) 60vw, (max-width: 1200px) 40vw, 30vw' />}
				</div>
				<div className={clsx(styles.txt)}>
					<h2>{post.title}</h2>
					<p>{post.desc}</p>
				</div>
			</article>
		</div>
	);
}
