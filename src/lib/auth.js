/*
  - Next에서의 로그인 인증 흐름
    : session - 서버 컴포넌트에 생성되는 정보값
    : session의 토큰값을 클라이언트에서 활용해서 그 값으로 인증처리
    : 클라이언트에서 전달받은 session이 있으면 로그인됨, 없으면 비로그인 상태

  - NextAuth를 활용해서 특정 조건 부합시 Next 프로젝트 전역에 session값을 활용할 수 있도록 리턴
  
  - email, password 입력방식
    : DB에 직접 사용자 입력정보를 받아서 저장한 뒤, 로그인을 통해 해당 정보값을 매칭해서 session 생성
    : password같이 민감한 정보값을 암호화처리해서 DB에 저장
    : session처리시에도 암호화된 값으로 비교해서 인증 처리

  - 외부 sns로 로그인 처리시에는 해당 정보값들이 해당 서비스사의 서버에 저장되므로 해당 값을 역으로 가지고와서 서버에 저장
    : 비밀번호는 받아올 수 없으므로 유저 정보 스키마 생성시 password는 optional 처리
*/

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { connectDB } from './connectDB';
import { User } from './models';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

// 로그인정보 DB정보에서 찾아서 인증 함수
const checkUserDB = async credentials => {
	try {
		connectDB();

		const user = await User.findOne({ username: credentials.username });
		if (!user) throw new Error('DB에 등록된 유저가 아닙니다(no username found in DB)');

		const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
		if (!isPasswordCorrect) throw new Error('비밀번호가 틀립니다(not matched password with DB)');

		return user;
	} catch (err) {
		console.log(err);
		throw new Error('Failed to login!');
	}
};

// NextAuth의 리턴값을 바로 비구조화할당해서 export로 내보냄
export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	...authConfig,
	providers: [
		// 기본 아이디 인증 Provider 설정
		CredentialsProvider({
			async authorize(credentials) {
				try {
					const user = await checkUserDB(credentials);
					return user;
				} catch (err) {
					return null; // null로 설정했기때문에 해당 파일의 에러 객체를 반환하지는 않고, LoginForm의 state에 담겨서 handleLogin안에 있는 에러가 반환됨
				}
			}
		}),
		// 깃허브 인증 Provider 설정
		Github({
			// 깃허브에서
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		// 구글 인증 Provider설정
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
		})
	],
	// 인증이 성공완료된 자동 실행될 callback함수(외부 autoConfig에서 가져옴)
	callbacks: {
		// { user, account, profile } => 외부 sns로그인시 해당 서비스사에서 가져와야할 정보값 (현재는 DB에 저장된 값을 가져오고 있으므로 필요없음)
		async signIn({ user, account, profile }) {
			if (account.provider === 'github') {
				connectDB();
				try {
					const user = await User.findOne({ username: profile.login }); // username은 겹칠수도 있으므로(동명이인)
					// DB에 user정보가 없으면 역으로 깃허브에서 해당 정보 가져와서 DB에 저장
					if (!user) {
						const newUser = new User({ username: profile.login, email: profile.email, img: profile.avatar_url });
						await newUser.save();
					}
				} catch (err) {
					console.log(err);
					return false;
				}
			}
			if (account.provider === 'google') {
				connectDB();
				try {
					const user = await User.findOne({ username: profile.name });
					if (!user) {
						const newUser = new User({ username: profile.name, email: profile.email, img: profile.picture });
						await newUser.save();
					}
				} catch (err) {
					console.log(err);
					return false;
				}
			}
			return true;
		},
		// 기존 auth.config에 있는 callbacks는 override되면 안되기에 아래쪽에서 재 override처리
		...authConfig.callbacks
	}
});
