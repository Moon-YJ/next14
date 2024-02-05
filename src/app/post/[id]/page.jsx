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
					<p>글 작성일: {new Date(post.createdAt).toLocaleString()} </p>
					<p>글 수정일: {new Date(post.updatedAt).toLocaleString()} </p>
					{post && (
						<Suspense fallback={<p>Loading...</p>}>
							<UserInfo name={post.username} />
						</Suspense>
					)}
					{/* 서버 컴포넌트에서는 onClick 이벤트 적용되지 않으므로(해당 이벤트는 클라이언트 방식에서만 가능하기 때문) 이벤트 발생시킬 버튼을 form 태그로 감싸서 서버 액션 함수를 acitons.js에 등록해서 적용 */}
					{/* 인수 전달시에는 hidden타입의 input을 만들어서 name에 연동하면 서버액션함수에 파라미터로 전달됨 */}
					{/* 만든 함수를 모든 컴포넌트에서 자유롭게 사용할 수 있는 api router에 비해 서버액션은 재사용성이 떨어지는 단점이 있음(==> form 태그 자체를 컴포넌트로 묶어서 활용하는 방법 사용) */}
					{(session?.user.name === post.username || session?.user.owner) && (
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

/*
	글 상세페이지 전용 페이지 컴포넌트 
	- 페이지 접속시 params로 해당글 고유값을 넘겨받아서 서버액션함수 getPosts로 해당 데이터 넘겨받아서 pre-render
	- 상세페이지에서 글 작성자 정보 데이터만 외부 컴포넌트로 분리후 Suspense로 동기화처리
	- 상세페이지에서 글 수정, 글 삭제 버튼이 있으므로 글 작성자만 수정, 삭제 가능하도록 auth로 인증 정보 받아서 조건부 렌더링
	- 글 작성자와 로그인된 현재 사용자의 정보가 일치할때만 수정, 삭제버튼 출력
	- 수정 버튼 클릭시 수정 페이지 컴포넌트로 라우터 이동
	- 삭제 버튼 클릭시 서버 액션으로 deletePost함수 호출

	auth 인증 객체
	- nextAuth로 인증정보 클라이언트측에서 전달받음
	- lib > auth.jsx 에서 확인

	getPosts, deletePost 
	- 서버 전용 액션함수
	- lib > action.js에서 확인
*/
