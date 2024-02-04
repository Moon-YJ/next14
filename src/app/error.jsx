'use client';

export default function Error() {
	return (
		<div>
			<h1>We have some Network Problem.</h1>
		</div>
	);
}

/*
	기본적으로 app폴더 안쪽에 있으므로 서버쪽에서 동작하는 페이지 컴포넌트이지만
	상단에 'use client'지정함으로써 클라이언트 방식으로 동작처리하도록 강제
	실제 클라이언트 런타임단에서 인증오류 에러 발생시 자동적으로 보여줄 페이지이므로 서버사이드가 아닌 클라이언트 사이드 처리
*/
