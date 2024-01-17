// action.js파일부터는 required말고 import 사용해도 됨(next가 제어하는 next의 기능이므로, connectDB.js와 model.js는 next의 기능이 아니므로 required 씀)
import { connectDB } from './connectDB';
import { Post } from './models';

export const getPosts = async id => {
	try {
		connectDB();
		let posts = null;
		if (id) posts = await Post.findById(id);
		else posts = await Post.find();
		return posts;
	} catch (error) {
		console.log(error);
		throw new Error('Failed to fetch posts data');
	}
};

export const addPosts = async data => {
	'use server'; // 서버쪽에 데이터를 요청해야하므로 해당 구문 추가
	//console.log(data); // 브라우저 콘솔창이 아닌 서버 터미널에서 확인 가능 //결과 - { name: 'title', value: 'ㅁㅁ' }, { name: 'img', value: 'ㅁㅁㅁ' }, { name: 'desc', value: 'ㅁㅁㅁ' }
	const { title, img, desc } = Object.fromEntries(data); // 객체의 value값만 뽑아서 key, value 객체로 반환해주는 메서드 //결과 - { title: 'ㅁㅁ', img: 'ㅁㅁㅁ', desc: 'ㅁㅁㅁ'}

	try {
		connectDB();
		const newPost = new Post({ title, img, desc });
		await newPost.save();
	} catch (err) {
		throw new Error('Failed to save a post');
	}
};
