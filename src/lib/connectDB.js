/*
  - Database: 데이터 저장 공간
  - Model: 데이터에 저장되는 정보 객체
  - Schema: Model 객체에 저장될 데이터 자료형, 프로퍼티 구조를 강제하는 시스템적인 틀
  - mongoose: MongoDB의 구조에 맞게 모델 객체 스키마 생성 및 모델 데이터 객체 제어 라이브러리
*/

const mongoose = require('mongoose'); // require: ES6 이전의 import 구문
let isConnected = false;

export const connectDB = async () => {
	// https://mongoosejs.com/docs/connections.html (mongoose 가이드 문서 참고)
	try {
		if (isConnected) {
			console.log('already connected');
			return;
		}
		const db = await mongoose.connect(process.env.MONGO_URL);
		isConnected = db.connection[0].readyState;
	} catch (error) {
		console.log(error);
		throw new Error('Fail to connect to DB');
	}
};
