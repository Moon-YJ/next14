import clsx from 'clsx';
import styles from './postDetail.module.scss';
import { deletePost, getPosts } from '@/lib/actions';
import Image from 'next/image';

export default async function PostDetail({ params }) {
	const post = await getPosts(params.id);
	console.log(post);
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
					{/* 서버 컴포넌트에서는 onClick 이벤트 적용되지 않으므로(해당 이벤트는 클라이언트 방식에서만 가능하기 때문) 이벤트 발생시킬 버튼을 form 태그로 감싸서 서버 액션 함수를 acitons.js에 등록해서 적용 */}
					{/* 인수 전달시에는 hidden타입의 input을 만들어서 name에 연동하면 서버액션함수에 파라미터로 전달됨 */}
					<form action={deletePost}>
						<nav>
							<input type='hidden' name={params.id} />
							<button>Delete</button>
						</nav>
					</form>
				</div>
			</article>
		</div>
	);
}
