'use client';
import { UploadButton } from '@/utils/uploadthing';

export default function UploadImage() {
	return (
		<div>
			<UploadButton
				endpoint='imageUploader'
				onClientUploadComplete={res => {
					console.log('Files: ', res);
					alert('Upload Completed');
				}}
				onUploadError={error => alert(`ERROR! ${error.message}`)}
			/>
		</div>
	);
}
