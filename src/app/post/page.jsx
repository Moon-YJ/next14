import clsx from 'clsx';
import styles from './post.module.scss';
import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';

export default async function Post() {
	return (
		<section className={clsx(styles.post)}>
			<h1>Post</h1>
			<Suspense fallback={<p>Loading...</p>}>
				<PostList />
			</Suspense>
		</section>
	);
}

/*
	Post 데이터 목록 페이지 컴포넌트 
	- 안쪽에 PostList 컴포넌트에서 Server 데이터 list를 fetching해서 가져올때 시간이 걸리므로 Suspend로 부분적 동기화 처리
	- 이미 loagind.jsx가 있어도 Suspense를 처리하는 이유는 서버데이터 이슈가 없는 정적인 페이지를 우선적으로 사용자에게 보여주기 위함
*/
