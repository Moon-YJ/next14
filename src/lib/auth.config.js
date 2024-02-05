// 굳이  auth.config파일을 따로 분리한 이유
// 해당 파일은 middleware.js에서 authConfig객체의 결과값만 따로 활용하기 위함
export const authConfig = {
	pages: {
		// signIn 메서드가 실행될때 기본으로 redirect되는 path지정
		signIn: '/login'
	},
	// auth에 spread로 합쳐질때 기존 provider가 override할것이므로 빈배열지정
	providers: [],
	// 해당 callback은 추후 따로 기존 auth를 아래쪽에서 override처리 예정
	callbacks: {
		// 인증 완료후 실행할 콜백함수
		// jwt방식으로 인증정보 토큰에 옮겨담는 함수
		// 전달 받은 user정보를 빈 token객체에 옮겨담아서 리턴
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.owner = token.name === 'Moon-YJ' ? true : false;
			}
			return token;
		},
		// 토큰값을 전달받아 전역 session 객체로 반환함수
		// 토큰값을 다시 전역 session에 넘겨서 리턴
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
				session.user.owner = token.owner;
			}
			return session;
		},
		// 인증처리시에만 접근가능한 URL 설정(인증처리시 redirect될 path를 조건지정)
		// false 리턴시 위에 page로 지정한 /login으로 redirect
		// true 리턴시 middleware에 설정된 규칙에 의해 강제로 메인페이지 이동
		authorized({ auth, request }) {
			const user = auth?.user;
			const isPostPage = request.nextUrl?.pathname.startsWith('/post');

			const isLoginPage = request.nextUrl?.pathname.startsWith('/login');

			if (isPostPage && !user) return false;
			if (isLoginPage && user) return Response.redirect(new URL('/', request.nextUrl));
			return true;
		}
	}
};

/*
	- 해당 정보값이 auth.js에 전개연산자로 합쳐짐
	- 따로 분리한 이유는 middleware.js에서 라우터 이동시 해당 정보값만 따로 필요하기 때문
	- auth.js에서 인증된 결과값을 session에 옮겨담고 전역 컴포넌트에 전달 처리 
	- 인증 결과에 따라 미리 설정된 middleware.js에 의해 강제 라우터 이동
	- 해당 auth.js의 요청은 api폴더 안쪽의 api > auth > [...nextauth] > route.js에서 응답 처리
	- route.js 서버응답 함수는 auth.js의 nextAuth가 반환
	- 구글, 깃허브 인증 요청시 api.js로의 요청 url 전달은 .env파일에서 리다이렉트 url등록 및 github, google 개발페이지에 url등록
	- middleware.js (middleware.js에서 주석 참조)
	- auth.js (lib > auth.js 주석 참조)
	- api 요청 응답 (api > auth > [...nextauth] > route.js 주석 참조)
	- 인증 관련 api 요청 url 연결 (.env 파일 참조)
*/
