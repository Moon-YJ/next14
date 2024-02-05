import clsx from 'clsx';
import styles from './edit.module.scss';
import { getPosts, updatePost } from '@/lib/actions';
import InputImage from '@/components/inputImage/InputImage';

export default async function Edit({ params }) {
	const { id } = params;
	const data = await getPosts(id);
	return (
		<div className={clsx(styles.edit)}>
			<h1>Edit Post</h1>
			<form action={updatePost}>
				<input type='hidden' name='id' value={id} />
				<input type='text' name='title' defaultValue={data.title} />
				<InputImage data={data} />
				{/* <input type='text' name='img' defaultValue={data.img || ''} /> */}
				<textarea name='desc' cols='30' rows='3' defaultValue={data.desc}></textarea>
				<nav>
					<input type='reset' value='cancel' />
					<input type='submit' value='update' />
				</nav>
			</form>
		</div>
	);
}

/*
	글 수정 페이지 전용 페이지 컴포넌트
	- params로 상세페이지 전용 id값 전달받아서 getPosts 전용 서버액션으로 데이터 가져옴
	- 글수정 버튼 클릭시 연결된 form요소의 updatePost 서버액션 함수 호출
	- 해당 페이지 자체는 server방식으로 실행됨
	- 사용자 이벤트에 따른 인터랙션은 server action함수가 담당
	- 사용자 이벤트를 클라이언트쪽에서 동작하지만 미리 서버쪽에서 프리렌더시 사용자 이벤트에 대한 서버쪽 응답 함수까지 연결해서 전달
	
	getPosts, updatePosts
	- lib > action.js 에서 참조
*/
