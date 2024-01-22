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
