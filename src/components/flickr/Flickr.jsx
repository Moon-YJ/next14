'use client';
import clsx from 'clsx';
import styles from './flickr.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useGlobalData } from '@/hooks/useGlobalData';

export default function Flickr() {
	const { ImgPanelOpen, setImgPanelOpen, setImgUrl } = useGlobalData();
	const [Pics, setPics] = useState([]);

	useEffect(() => {
		const fetchFlickr = async () => {
			const num = 18;
			const flickr_api = process.env.NEXT_PUBLIC_FLICKR_API;
			const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
			const method_interest = 'flickr.interestingness.getList';
			const interestURL = `${baseURL}${method_interest}`;
			const data = await fetch(interestURL);
			const response = await data.json();
			setPics(response.photos.photo);
		};

		fetchFlickr();
	}, []);

	return (
		<>
			{ImgPanelOpen && (
				<aside className={clsx(styles.flickr)}>
					<h1>Unsplash</h1>
					<button onClick={() => setImgPanelOpen(false)}>close</button>
					<div>
						{Pics.map((pic, idx) => {
							return (
								<p key={pic.id}>
									<Image
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										alt={pic.title}
										priority
										fill
										sizes='(max-width: 768px) 60vw, (max-width: 1200px) 40vw, 30vw'
										onClick={() => {
											setImgUrl(`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`);
										}}
									/>
								</p>
							);
						})}
					</div>
				</aside>
			)}
		</>
	);
}

/*
	- 추천 flickr 이미지 URL 등록 로직 흐름
		1. image URL이 담길 전역 state 추가 (useGlobalData.js)
		2. InputImage  컴포넌트 생성 (image URL 등록할 input 요소, Flickr panel 호출버튼, Flickr panel 컴포넌트)
		3. Flickr panel 호출버튼 클릭시 Flickr panel 호출
		4. Flickr panel 컴포넌트 마운트시 flickr data fetching후 썸네일 출력
		5. 출력된 썸네일에 클릭이벤트 발생시 해당 image URL을 전역 state에 담아줌
		6. 부모 컴포넌트 InputImage의 input 요소에는 전역 state에 의해서 클릭한 Flickr 썸네일 image URL 전달
		7. 상위 부모인 write/page.jsx, edit/page.jsx 컴포넌트에서 action이벤트 발생시 전달된 image URL값을 post Model에 저장
*/
