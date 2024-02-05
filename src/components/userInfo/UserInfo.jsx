import clsx from 'clsx';
import styles from './userInfo.module.scss';
import { getUser } from '@/lib/actions';
import Image from 'next/image';

export default async function UserInfo({ name }) {
	const user = await getUser(name);
	return (
		<>
			{user && (
				<article className={clsx(styles.userInfo)}>
					<p>{user?.email}</p>
					<div className={styles.pic}>
						<Image src={user?.img} width={50} height={50} alt={user?.email} />
					</div>
				</article>
			)}
		</>
	);
}

/*
	Post 상세페이지에 출력되는 글 작성 유저정보 출력 컴포넌트 (app > post > [id] > page.jsx에서 호출됨)
	- 상세 페이지로 부터 해당 포스트 작성의 유저 이메일을 전달받음
	- 전달받은 이메일 값으로 getUser 서버액션함수를 실행하여 해당 email정보와 매칭되는 유저정보전체를 DB에서 가져옴
	- 가져온 유저정보의 이미지 등을 출력
	
	getUser : lib > action.js에서 참조
*/
