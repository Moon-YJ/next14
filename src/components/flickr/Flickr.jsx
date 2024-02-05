'use client';
import clsx from 'clsx';
import styles from './flickr.module.scss';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useGlobalData } from '@/hooks/useGlobalData';

export default function Flickr() {
	const { ImgPanelOpen, setImgPanelOpen, setImgUrl } = useGlobalData();
	const [Pics, setPics] = useState([]);
	const refInput = useRef(null);

	const fetchFlickr = async opt => {
		const num = 18;
		const flickr_api = process.env.NEXT_PUBLIC_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		let url = '';
		if (opt.type === 'interest') url = `${baseURL}${method_interest}`;
		if (opt.type === 'search') url = `${baseURL}${method_search}&tags=${opt.tag}`;
		const data = await fetch(url);
		const response = await data.json();
		setPics(response.photos.photo);
	};

	const handleSearch = e => {
		e.preventDefault();
		const tags = refInput.current.value.trim();
		if (!tags) return;
		fetchFlickr({ type: 'search', tag: tags });
	};

	useEffect(() => {
		fetchFlickr({ type: 'interest' });
	}, []);

	return (
		<>
			{ImgPanelOpen && (
				<aside className={clsx(styles.flickr)}>
					<h1>Unsplash</h1>
					<button onClick={() => setImgPanelOpen(false)}>close</button>
					<div>
						<input type='text' placeholder='search' ref={refInput} />
						<button onClick={handleSearch}>검색</button>
					</div>
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

/*
	추천 이미지 검색 버튼 클릭시 호출되는 컴포넌트 (components > InputImage.jsx에서 호출)
	- InputImage컴포넌트의 추천이미지 버튼 클릭시 호출되는 패널 
	- 해당 패널안쪽에 우선 Flickr API의 interestingness 추천 이미지 썸네일 출력
	- 검색창에 검색어 입력하고 검색이벤트 발생시 해당 키워드로 이미지 썸네일 출력
	- 특정 썸네일 클릭시 해당 썸네일의 이미지 URL을 globlaData훅으로 전역에 전달
	- InputImage컴포넌트에서 전역의 전달된 이미지 URL을 input에 옮겨줌
*/
