/*
  // 서버에서 모델 데이터 생성을 api router에서 처리시에는 해당 route에 GET, POST요청에 대한 session 응답처리하는게 맞지만
    const handler = NextAuth({
      ...
    })
  // 현재 프로젝트 구조에서는 모든 서버 데이터를 api라우터가 아닌 lib안쪽의 server action.js에서 처리하고 있기 때문에
  // 프로젝트의 효율적인 관리를 위해 lib 폴더 안쪽의 auth.js에서 GET, POST요청에 대한 서버 응답함수를 만들어서 export한 내용을 /api 라우터에서 import 하자마자 바로 export 처리(중개역할)
*/
export { GET, POST } from '@/lib/auth';

/*
    1. next-auth 5버전 설치
    2. env파일에 환경변수 등록 (AUTH_SECRET, AUTH_URL)
    3. AUTH_URL에 등록된 주소로 서버인증요청을 보내야함 api/auth/[...nextauth]/route.js 작성
    4. lib > auth.config.js 등록(추후 auth.js에서 활용될 설정코드를 ?따로 파일로 분리)
    5. 위에서 만든 auth.config.js를 auth.js에서 호출하여 합침 -> GET, POST 응답에 대한 함수를 api>auth -> route.js에 전달
    ================== 인증을 위한 모든 설정 완료 ==================
    6. header에 로그인 여부에 따른 분기처리
*/
