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
