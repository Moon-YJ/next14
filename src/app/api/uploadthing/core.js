//npm install uploadthing @uploadthing/react
import { createUploadthing } from 'uploadthing/next';

const f = createUploadthing();
const auth = req => ({ id: 'test' }); // 가상의 인증 함수

// file 업로드 관련 route함수
export const ourFileRouter = {
	// 이미지는 파일당 최대 4MB까지 등록 가능
	imageUploader: f({ image: { maxFileSize: '4MB' } })
		.middleware(async ({ req }) => {
			const user = await auth(req);
			// 인증 실패시 에러객체 전달
			if (!user) throw new Error('Unauthorized');
			// 인증 성공시 id값 리턴
			return { userId: user.id };
		})
		// 서버상에 파일 업로드가 성공적으로 완료되었을때 실행될 complete 함수
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId);
			console.log('file url', file.url);
			return { uploadedBy: metadata.userId };
		})
};
