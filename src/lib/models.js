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
		},
		username: { type: String }
	},
	{ timestamps: true } // 시간 저장되게
);

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		password: { type: String },
		img: { type: String },
		owner: { type: Boolean, default: false } // 추후 mongoDB에서 해당 사용자만 직접 true로 변경하기
	},
	{ timestamps: true }
);

// mongoose.models.Post가 undefined일때 오른쪽 실행(mongoose.models.Post의 값이 있으면 실행하지 않음 => Post값이 있을때 중복호출 방지)
export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);

/*
  - DB 종류
    1. DBMS: table 형식으로 저장하는 구조 (ex. Oracle, MySQL, MSSQL, MariaDB)
    2. NoSQL: JSON 저장하는 구조 (ex. MongoDB)

  - MongoDB 구조(noSQL)
    : Database - collection(배열) - document(모델 객체)
*/
