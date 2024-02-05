/*
  - Database: 데이터 저장 공간
  - Model: 데이터에 저장되는 정보 객체
  - Schema: Model 객체에 저장될 데이터 자료형, 프로퍼티 구조를 강제하는 시스템적인 틀
  - mongoose: MongoDB의 구조에 맞게 모델 객체 스키마 생성 및 모델 데이터 객체 제어 라이브러리
*/

const mongoose = require('mongoose'); // require: ES6 이전의 import 구문
// import mongoose from 'mongoose' 와 같은 구문임
let isConnected = false;

export const connectDB = async () => {
	// https://mongoosejs.com/docs/connections.html (mongoose 가이드 문서 참고)
	try {
		if (isConnected) return console.log('already connected');

		const db = await mongoose.connect(process.env.MONGO_URL);
		isConnected = db.connections[0].readyState;
	} catch (error) {
		console.log(error);
		throw new Error('Failed to connect to DB');
	}
};

// 몽고 DB접속 파일
// 몽고 DB접속이 이미 되어 있으면 중복 접속처리 하지 않음
