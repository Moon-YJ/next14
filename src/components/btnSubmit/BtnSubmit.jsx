'use client';
import { useFormStatus } from 'react-dom';

export default function BtnSubmit() {
	const { pending } = useFormStatus();

	return (
		<button type='submit' disabled={pending}>
			{pending ? 'loading..' : 'write'}
		</button>
	);
}

/*
	글 작성 버튼 컴포넌트 (app > post > write > page.jsx 에서 호출됨)
	- useFormStatus훅을 이용하여 write버튼 클릭시 서버액션이 끝날때까지 버튼을 비활성화 시키면서 로딩 메세지 출력
*/
