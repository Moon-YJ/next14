'use client';
import { useGlobalData } from '@/hooks/useGlobalData';
import { UploadButton } from '@/utils/uploadthing';

export default function UploadImage() {
	const { setImgUrl } = useGlobalData();
	return (
		<div>
			<UploadButton
				endpoint='imageUploader'
				onClientUploadComplete={res => {
					console.log('Files: ', res);
					setImgUrl(res[0].url);
					alert('Upload Completed');
				}}
				onUploadError={error => alert(`ERROR! ${error.message}`)}
			/>
		</div>
	);
}

/*
	uploadthing 파일 전용 호스팅 클라우드 서비스를 활용한 로컬 파일 업로드 컴포넌트 (app > post > write > page.jsx에서 호출됨)
	- utils > uploadthing.js로부터 이미지 업로드 버튼 컴포넌트 연결
	- 파일 업로드 이벤트 호출시 연결될 api 서버응답 라우트 연결 ( app > api > uploadthing > core.js, route.js 참조)
	- 해당 컴포넌트로 이벤트 발생시 로컬 파일이 uploadthing 클라우드 호스팅에 파일 업로드가 되고 
	- 업로드 완료시 동기적으로 해당 서버의 업로드된 파일 정보를 useGlobalData 훅으로 전역 state에 저장 
	- 추후 해당 전역 state값은 최종 글 포스트 입력시 서버액션에 의해 MongoDB에 저장됨
*/
