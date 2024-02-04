import clsx from 'clsx';
import styles from './youtube.module.scss';
import YoutubeCard from '@/components/youtubeCard/YoutubeCard';

async function fetchYoutube() {
	const api_key = process.env.NEXT_PUBLIC_YOUTUBE_API;
	const pid = process.env.NEXT_PUBLIC_PId;
	const num = 7;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
	const data = await fetch(baseURL);
	const json = await data.json();
	return json;
}

export default async function Youtube() {
	const data = await fetchYoutube();
	return (
		<section className={clsx(styles.youtube)}>
			<h1>Youtube</h1>
			{data.items.map((data, idx) => {
				return <YoutubeCard key={data.id} data={data} isPriority={idx < 4 ? true : false} isPrefetch={idx < 6 ? false : true} />;
			})}
		</section>
	);
}

/*
	fetchYoutube: 서버쪽에서 유튜브 데이터 fetching함수 (async await 동기화해서 데이터 리턴)
	Youtube: fetchYoutube로 부터 넘겨받은 데이터로 미리 서버단에서 data pre-render 처리
	isPriority: 해당 페이지에서 client방식으로 동작할 컴포넌트의 이미지의 우선선위 설정을 위한 prop전달
	isPrefetch: client 방식으로 동작할 Link컴포넌트의 prefetch를 위한 props전달
*/
