import clsx from 'clsx';
import styles from './postDetail.module.scss';
import { deletePost, getPosts } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import UserInfo from '@/components/userInfo/UserInfo';
import { Suspense } from 'react';
import { auth } from '@/lib/auth';

export default async function PostDetail({ params }) {
	const { id } = params;
	const post = await getPosts(id);
	const session = await auth();

	return (
		<div className={clsx(styles.postDetail)}>
			<h1>Post Detail</h1>
			<article key={post._id}>
				<div className={clsx(styles.pic)}>
					{post.img ? (
						<Image src={post.img} alt={post.title} priority fill sizes='(max-width: 768px) 60vw, (max-width: 1200px) 40vw, 30vw' />
					) : (
						<span></span>
					)}
				</div>
				<div className={clsx(styles.txt)}>
					<h2>{post.title}</h2>
					<p>{post.desc}</p>
					{post && (
						<Suspense fallback={<p>Loading...</p>}>
							<UserInfo name={post.username} />
						</Suspense>
					)}
					{/* 서버 컴포넌트에서는 onClick 이벤트 적용되지 않으므로(해당 이벤트는 클라이언트 방식에서만 가능하기 때문) 이벤트 발생시킬 버튼을 form 태그로 감싸서 서버 액션 함수를 acitons.js에 등록해서 적용 */}
					{/* 인수 전달시에는 hidden타입의 input을 만들어서 name에 연동하면 서버액션함수에 파라미터로 전달됨 */}
					{/* 만든 함수를 모든 컴포넌트에서 자유롭게 사용할 수 있는 api router에 비해 서버액션은 재사용성이 떨어지는 단점이 있음(==> form 태그 자체를 컴포넌트로 묶어서 활용하는 방법 사용) */}
					{session?.user.email === post.email && (
						<nav>
							<Link href={`/post/edit/${id}`}>Edit</Link>
							<form action={deletePost}>
								<nav>
									<input type='hidden' name={id} />
									<button>Delete</button>
								</nav>
							</form>
						</nav>
					)}
				</div>
			</article>
		</div>
	);
}
