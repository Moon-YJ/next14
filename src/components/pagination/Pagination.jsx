'use client';
import clsx from 'clsx';
import styles from './pagination.module.scss';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Pagination({ total, nums }) {
	// useSearchParams훅으로 가져온 params값(ex. page=1)은 .get으로 값 반환, .set으로 값 세팅 가능
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const page = searchParams.get('page') || 1;
	// 기존의 params값을 인수로 넣어서 새로운 params 인스턴스 객체 복사
	const params = new URLSearchParams(searchParams);
	const isPrev = nums * (parseInt(page) - 1) > 0;
	const isNext = nums * (parseInt(page) - 1) + nums < total;

	// 변경된 새로운 params인스턴스 값을 전달된 page번호에 맞게 가공해서 기존 URL을 변경처리해서 강제 라우터 이동함수
	const changePage = type => {
		type === 'prev' ? params.set('page', parseInt(page) - 1) : params.set('page', parseInt(page) + 1);
		replace(`${pathname}?${params}`);
	};

	return (
		<nav className={clsx(styles.pagination)}>
			<button onClick={() => changePage('prev')} disabled={!isPrev}>
				prev
			</button>

			{/* 전체 포스트 개수 대비 현재 페이지에 보일 개수를 나눠서 전체 페이지버튼 개수로 버튼 생성 */}
			{Array(total % nums === 0 ? parseInt(total / nums) : parseInt(total / nums) + 1)
				.fill()
				.map((_, idx) => {
					return (
						<Link key={idx} href={`/post?page=${idx + 1}`} className={clsx(idx + 1 === parseInt(page) ? styles.on : '')}>
							{idx + 1}
						</Link>
					);
				})}

			{isNext && <button onClick={() => changePage('next')}>next</button>}
		</nav>
	);
}

/*
	PostList컴포넌트로 부터 호출되는 게시글 페이지번호 출력 컴포넌트 (components > PageList.jsx에서 호출됨)
	- 부모로부터 서버쪽의 전체 post 개수 현재 페이지 번호를 props로 받아 페이지 번호에 맞는 페이지 번호 출력 및 활성화
	- 코드 상세 설명은 위의 주석 참조
*/
