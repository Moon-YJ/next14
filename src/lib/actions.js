// action.js파일부터는 required말고 import 사용해도 됨(next가 알아서 처리해줌)
import { connectDB } from './connectDB';
import { Post } from './models';

export const getPosts = async () => {
	try {
		console.log('클라이언트 요청에 의해 DB 접속 시작');
		connectDB();
	} catch (error) {
		console.log(error);
		throw new Error('Failed to fetch posts data');
	}
};
