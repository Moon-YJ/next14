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

import { connectDB } from './connectDB';
import { User } from './models';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

//로그인 인증함수
const login = async credentials => {
	try {
		connectDB();

		const user = await User.findOne({ username: credentials.username });
		if (!user) throw new Error('Wrong credentials!');
		const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

		if (!isPasswordCorrect) throw new Error('Wrong credentials!');
		return user;
	} catch (err) {
		console.log(err);
		throw new Error('Failed to login!');
	}
};

//NextAuth의 리턴값을 바로 비구조화할당해서 export로 내보냄
export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	...authConfig,
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				try {
					const user = await login(credentials);
					return user;
				} catch (err) {
					return null;
				}
			}
		})
	],
	//인증이 성공완료된 자동 실행될 callback함수(외부 autoConfig에서 가져옴)
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account.provider === 'github') {
				connectDB();
				try {
					const user = await User.findOne({ email: profile.email });

					if (!user) {
						const newUser = new User({
							username: profile.login,
							email: profile.email,
							image: profile.avatar_url
						});

						await newUser.save();
					}
				} catch (err) {
					console.log(err);
					return false;
				}
			}
			return true;
		},
		...authConfig.callbacks
	}
});
