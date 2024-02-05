import clsx from 'clsx';
import styles from './write.module.scss';
import { addPosts } from '@/lib/actions';
import InputImage from '@/components/inputImage/InputImage';
// import Unsplash from '@/components/unsplash/Unsplash';
import { auth } from '@/lib/auth';
import ImageUploader from '@/components/uploadImage/UploadImage';
import BtnSubmit from '@/components/btnSubmit/BtnSubmit';

export default async function Write() {
	const session = await auth();
	return (
		<>
			<section className={clsx(styles.write)}>
				<h1>Write Post</h1>

				<form action={addPosts}>
					<input type='hidden' name='username' value={session.user.name} />
					<input type='text' placeholder='title' name='title' />
					<InputImage />
					<ImageUploader />
					<textarea name='desc' cols='30' rows='3' placeholder='description'></textarea>

					<nav>
						<input type='reset' value='cancel' />
						{/* <input type='submit' value='write' /> */}
						<BtnSubmit />
					</nav>
				</form>
			</section>
			{/* <Unsplash /> */}
		</>
	);
}

/*
	- 포스트저장시 글작성자 정보 같이 저장하는 로직 흐름
	1. app/post/write -> auth객체에서 로그인된 사용자정보인 session을 가져와서 email값을 input에 hidden숨겨서 addPost 서버액션함수로 전달
	2. lib/actions.js (addPost) -> 파라미터로 email값을 받아서 email값 추가해서 모델 인스턴스 생성후 DB에 저장
	3. app/post/[id] -> 상세페이지 접속시 getPosts 서버액션 함수로 상세포스트 정보 가져옴
	4. <UserInfo /> -> 상세페이지 안쪽의 해당 컴포넌트의 email값을 props로 전달 (동기화를 위해 Suspense활용)
	5. components > userInfo (getUser) -> getUser서버 액션함수가 email값을 전달받아서 해당 유저정보객체 반환
	6. 반환된 유저정보를 userInfo컴포넌트에 원하는 형태로 출력
*/

/*
	글작성 페이지 컴포넌트
	- server action으로 form안쪽의 <BtnSubmit /> 에서 클릭 이벤트 발생시 form action의 addPost 서버액션 함수 실행됨
	- addPost 함수는 (lib> action.js 파일 참조)

	<BtnSubmit /> 컴포넌트를 따로 분리한 이유 
	- 해당 페이지는 서버방식으로 고수하고 이벤트 호출만 클라이언트로 처리하기 위함
	- BtnSubmit 안쪽에서 버튼 클릭시 로딩바처리를 위한 useFormStatus 훅을 사용하기 위함

	<InputImage /> 
	- Flickr API로 부터 추천 이미지 검색후 input form에 넣어주는 클라이언트 방식 컴포넌트	
	
	<ImageUploader />
	- 파일 업로드시 내 컴퓨터의 이미지를 찾아서 이미지 전용 서버에 업로드후 해당 url을 input form에 넣어주는 클라이언트 방식 컴포넌트
	- uploadthing 이미지호스팅 전용 외부 라이브러리 활용
*/
