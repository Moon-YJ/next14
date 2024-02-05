export default function Loading() {
	return (
		<section>
			<h1>Post Page Loading..</h1>
		</section>
	);
}

/*
	- Post 목록 페이지의 정적인 컨텐츠가 로딩되기 전까지 출력될 화면
	- 실제 안쪽에서 서버에서 가져오는 데이터의 loading처리는 해당 페이지 안쪽의 Suspense에서 로딩처리
*/
