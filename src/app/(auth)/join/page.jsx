import clsx from 'clsx';
import styles from './join.module.scss';
import JoinMembers from '@/components/joinMembers/JoinMembers';

export default function Join() {
	return (
		<section className={clsx(styles.join)}>
			<h1>Join</h1>
			<JoinMembers />
		</section>
	);
}

/*
	Skip 라우터로 중간 url을 생략처리하고 회원관련 페이지 컴포넌트 생성
	- 회원가입 이벤트는 클라이언트 방식으로 처리해야 하므로 JoinMembers를 따로 클라이언트 방식으로 컴포넌트 분리해서 호출
	- JoinMembers.jsx 파일 참조
*/
