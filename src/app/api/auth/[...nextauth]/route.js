/*
  // 서버에서 모델 데이터 생성을 api router에서 처리시에는 해당 route에 GET, POST요청에 대한 session 응답처리하는게 맞지만
    const handler = NextAuth({
      ...
    })
  // 현재 프로젝트 구조에서는 모든 서버 데이터를 api라우터가 아닌 lib안쪽의 server action.js에서 처리하고 있기 때문에
  // 프로젝트의 효율적인 관리를 위해 lib 폴더 안쪽의 auth.js에서 GET, POST요청에 대한 서버 응답함수를 만들어서 export한 내용을 /api 라우터에서 import 하자마자 바로 export 처리(중개역할)
*/
export { GET, POST } from '@/lib/auth';
