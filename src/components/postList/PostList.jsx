import clsx from 'clsx';
import styles from './postList.module.scss';
import Pagination from '../pagination/Pagination';
import Link from 'next/link';
import Image from 'next/image';
import { getPostsPage } from '@/lib/actions';

export default async function PostList({ searchParams }) {
	// 현재 페이지에 전달된 query가 있으면 page의 값을 가져옴, 없으면 1로 초기화
	const page = searchParams?.page || 1;
	// 현재 페이지 번호를 인수로 전달해서 페이지번호에 따른 전체 포스트 개수, 출력할 포스트배열, 페이지당 출력할 개수 반환
	const { total, posts, nums } = await getPostsPage(page);

	return (
		<section className={clsx(styles.postList)}>
			{/* Pagination컴포넌트를 호출하고 전체 포스트 개수와 페이지당 포스트 개수 전달 */}
			<Pagination total={total} nums={nums} />
			<nav>
				<Link href='/post/write'>Write Post</Link>
			</nav>

			{posts.map(post => (
				<article key={post._id}>
					<div className={clsx(styles.pic)}>{post.img && <Image src={post.img} alt={post.title} priority fill />}</div>
					<h2>
						<Link href={`/post/${post._id}`}>{post.title}</Link>
					</h2>
					<p>{post.desc}</p>
				</article>
			))}
		</section>
	);
}
