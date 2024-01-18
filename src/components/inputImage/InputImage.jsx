'use client';

import { useGlobalData } from '@/hooks/useGlobalData';
import Flickr from '../flickr/Flickr';
import { useEffect } from 'react';

export default function InputImage({ data }) {
	const { ImgUrl, setImgUrl, setImgPanelOpen } = useGlobalData();

	useEffect(() => {
		setImgUrl('');
	}, [setImgUrl]);

	return (
		<>
			<input
				type='text'
				placeholder='image URL'
				// ImgUrl(Flickr Panel에서 전달받는 값: 처음 포스트 작성시: Post> Write)
				// data.img (이미작성된 상세페이지 데이터로 부터 전달 받는값: Post> Edit)
				// ImgUrl값이 없으면 수정모드일때이므로 data.img를 활용
				// ImgUrl값이 있으면 처음글작성모드일때이므로 ImgUrl을 활용
				value={ImgUrl ? ImgUrl : data?.img || ''}
				// value={ImgUrl !== '' ? ImgUrl : data?.img || ''}
				name='img'
				onChange={e => setImgUrl(e.target.value)}
			/>
			<span onClick={() => setImgPanelOpen(true)}>추천 이미지</span>
			<Flickr />
		</>
	);
}
