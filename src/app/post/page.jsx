import clsx from 'clsx';
import styles from './post.module.scss';
import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';

export default async function Post({ searchParams }) {
	const session = await auth();
	// 현재 페이지에 전달된 query가 있으면 page의 값을 가져옴, 없으면 1로 초기화
	const page = searchParams?.page || 1;
	// 현재 페이지 번호를 인수로 전달해서 페이지번호에 따른 전체 포스트 개수, 출력할 포스트배열, 페이지당 출력할 개수 반환
	const { total, posts, nums } = await getPostsPage(page);

	return (
		<section className={clsx(styles.post)}>
			<h1>Post</h1>
			<Suspense fallback={<p>Loading...</p>}>
				<PostList />
			</Suspense>
		</section>
	);
}
