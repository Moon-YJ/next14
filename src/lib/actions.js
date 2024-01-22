// action.js파일부터는 required말고 import 사용해도 됨(next가 제어하는 next의 기능이므로, connectDB.js와 model.js는 next의 기능이 아니므로 required 씀)
// 해당 actions 함수 파일에서 서버 컴포넌트뿐만 아니라 클라이언트 컴포넌트에서도 호출하는 함수가 있다면 'use server'구문을 함수 안쪽에 각각 입력하는 것이 아니라 해당 파일 상단에 등록(권장)
// 혹은 클라이언트 컴포넌트에서 호출하는 액션 함수를 다른 파일로 분리해야함
'use server'; // 서버쪽에 데이터를 요청해야하므로 해당 구문 추가
import { revalidatePath } from 'next/cache';
import { connectDB } from './connectDB';
import { Post, User } from './models';
import { redirect } from 'next/navigation';
import { signIn, signOut } from './auth';
import bcrypt from 'bcryptjs';

// post
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

// 인수로 받은 현재 페이지번호에 따라 다음의 정보를 반환하는 함수
// {전체 데이터 개수, 출력될 포스트 배열, 현재페이지에 보일 데이터 개수}
export const getPostsPage = async page => {
	const nums = 3; // 한 페이지당 보일 post 개수 설정

	try {
		connectDB();
		const total = await Post.find().sort({ _id: -1 }).count(); // 전체 데이터 개수
		const posts = await Post.find()
			.sort({ _id: -1 })
			.limit(nums) // nums 개수만큼 데이터 출력 제한
			.skip(nums * (page - 1)); // 현재 페이지 번호에 따라 출력한 데이터의 시작순번 지정해서 스킵할 데이터수 지정 (.limit()과 세트, ex. 첫번째 페이지면 1-1=0번째 데이터 부터 출력(0,1,2), 두번째 페이지는 2-1=1 * 3번째 데이터부터 출력)
		return { total, posts, nums };
	} catch (err) {
		console.log(err);
		throw new Error('Fail to fetch All posts data!!');
	}
};

export const addPosts = async formData => {
	//console.log(data); // 브라우저 콘솔창이 아닌 서버 터미널에서 확인 가능 //결과 - { name: 'title', value: 'ㅁㅁ' }, { name: 'img', value: 'ㅁㅁㅁ' }, { name: 'desc', value: 'ㅁㅁㅁ' }
	//const { title, img, desc, username } = Object.fromEntries(formData); // 객체의 key값은 제외하고 value값만 뽑아서 key, value 객체로 반환해주는 메서드 //결과 - { title: 'ㅁㅁ', img: 'ㅁㅁㅁ', desc: 'ㅁㅁㅁ'}
	const result = Object.fromEntries(formData);
	const { title, img, desc, email } = result;

	try {
		connectDB();
		const newPost = new Post({ title, img, desc, email: email });
		await newPost.save();
	} catch (err) {
		throw new Error('Failed to save a post');
	}
	revalidatePath('/post'); // 원래는 서버쪽에서 build된 후 static한 데이터로 남아있으므로 revalidatePath 설정하여 해당 path 접속시 서버쪽 내용 갱신
	redirect('/post'); // post 목록페이지로 이동
};

export const deletePost = async formData => {
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

export const getUser = async username => {
	try {
		connectDB();
		const user = await User.findOne({ username: username });
		return user;
	} catch (err) {
		console.log(err);
		throw new Error('Fail to fetch User Info!');
	}
};

// npm i bcryptjs
// User 데이터 추가 서버액션 함수
export const addUser = async (previousState, formData) => {
	const { username, email, password, img, repassword } = Object.fromEntries(formData);

	if (password !== repassword) {
		return { error: 'Passwords do not match' };
	}

	try {
		connectDB();

		const user = await User.findOne({ username });

		if (user) {
			return { error: 'Username already exists' };
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			img
		});

		await newUser.save();
		console.log('saved to db');

		return { success: true };
	} catch (err) {
		console.log(err);
		return { error: 'Something went wrong!' };
	}
};

// 로그인 서버액션 함수
export const handleLogin = async (prevState, formData) => {
	console.log('handleLogin');
	const { username, password } = Object.fromEntries(formData);
	console.log('인증값', username, password);

	try {
		await signIn('credentials', { username, password });
		revalidatePath('/');
		redirect('/');
	} catch (err) {
		console.log('인증에러');
		console.log(err);

		if (err.message.includes('CredentialsSignin')) {
			return { error: 'Invalid username or password' };
		}
		throw err;
	}
};

// 깃허브 로그인 서버액션 함수
export const handleGithubLogin = async () => {
	await signIn('github');
};

// 구글 로그인 서버액션 함수
export const handleGoogleLogin = async () => {
	await signIn('google');
};

// 로그아웃 서버액션 함수
export const handleLogout = async () => {
	'use server';
	await signOut();
	revalidatePath('/');
	redirect('/');
};
