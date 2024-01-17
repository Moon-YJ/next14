// action.js파일부터는 required말고 import 사용해도 됨(next가 제어하는 next의 기능이므로, connectDB.js와 model.js는 next의 기능이 아니므로 required 씀)
import { revalidatePath } from 'next/cache';
import { connectDB } from './connectDB';
import { Post } from './models';
import { redirect } from 'next/navigation';

export const getPosts = async id => {
	try {
		connectDB();
		let posts = null;
		if (id) posts = await Post.findById(id);
		else posts = await Post.find().sort({ _id: -1 }); // .sort({ _id: -1 }) => post 최신순으로 뜨게 처리
		return posts;
	} catch (error) {
		console.log(error);
		throw new Error('Failed to fetch posts data');
	}
};

export const addPosts = async data => {
	'use server'; // 서버쪽에 데이터를 요청해야하므로 해당 구문 추가
	//console.log(data); // 브라우저 콘솔창이 아닌 서버 터미널에서 확인 가능 //결과 - { name: 'title', value: 'ㅁㅁ' }, { name: 'img', value: 'ㅁㅁㅁ' }, { name: 'desc', value: 'ㅁㅁㅁ' }
	const { title, img, desc } = Object.fromEntries(data); // 객체의 key값은 제외하고 value값만 뽑아서 key, value 객체로 반환해주는 메서드 //결과 - { title: 'ㅁㅁ', img: 'ㅁㅁㅁ', desc: 'ㅁㅁㅁ'}

	try {
		connectDB();
		const newPost = new Post({ title, img, desc });
		await newPost.save();
	} catch (err) {
		throw new Error('Failed to save a post');
	}
	revalidatePath('/post'); // 원래는 서버쪽에서 build된 후 static한 데이터로 남아있으므로 revalidatePath 설정하여 해당 path 접속시 서버쪽 내용 갱신
	redirect('/post'); // post 목록페이지로 이동
};

export const deletePost = async formData => {
	'use server';
	try {
		const data = Object.fromEntries(formData);
		const id = Object.keys(data)[0];
		// findByIdAndDelete 메서드로 삭제할 document의 _id의 value값 전달
		await Post.findByIdAndDelete(id);
	} catch (err) {
		console.log(err);
		throw new Error('Failed to delete post');
	}
	revalidatePath('/post');
	redirect('/post');
};

export const updatePost = async formData => {
	'use server';
	try {
		// 수정페이지에서 입력한 input항목들을 받아서 객체로 비구조화할당
		const { id, title, img, desc } = Object.fromEntries(formData);
		// 전달받은 각각의 값들을 새로운 객체(key:value)로 wrapping 처리
		// {id: 'id', title: 'title', img: 'img', desc: 'desc'}
		const updateObj = { title, img, desc }; // id 값은 어차피 같으니까 굳이 넣어서 덮어쓰기할 필요 없음
		// 모델명.findByIdAndUpdate('ObjectId.valule', {수정할 document의 key: 수정할 value, ...})
		await Post.findByIdAndUpdate(id, updateObj);
	} catch (err) {
		console.log(err);
		throw new Error('Failed to update post');
	}
	revalidatePath('/post');
	redirect('/post');
};
