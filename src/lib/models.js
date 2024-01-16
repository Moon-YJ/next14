const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		desc: {
			type: String,
			required: true
		},
		img: {
			type: String // 이미지는 optional(default가 required: false)
		}
	},
	{ timestamps: true } // 시간 저장되게
);

// mongoose.models.Post가 undefined일때 오른쪽 실행(mongoose.models.Post의 값이 있으면 실행하지 않음 => Post값이 있을때 중복호출 방지)
export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
