import clsx from 'clsx';
import styles from './youtube.module.scss';
import { useCustomText } from '@/hooks/useText';
import Image from 'next/image';

async function fetchYoutube() {
	const api_key = 'AIzaSyB81cXmxoWdzbYs8QZUlN_LQskZFT_Xqoo';
	const pid = 'PLMaY0ixOiylhwpATMD-PQjeVREn5MOfSp';
	const num = 7;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
	const data = await fetch(baseURL);
	const json = await data.json();
	return json;
}

export default async function Youtube() {
	const shortenText = useCustomText('shorten');
	const customText = useCustomText('combined');
	const data = await fetchYoutube();
	console.log(data);
	return (
		<section className={clsx(styles.youtube)}>
			<h1>Youtube</h1>
			{data.items.map((data, idx) => {
				const [date, time] = data.snippet.publishedAt.split('T');

				return (
					<article key={data.id + idx}>
						<h2>{shortenText(data.snippet.title, 50)}</h2>

						<div className={styles.txt}>
							<p>{shortenText(data.snippet.description, 250)}</p>
							<div className='infoBox'>
								<span>{customText(date, '.')}</span>
								<em>{time.split('Z')[0]}</em>
							</div>
						</div>

						<div className={styles.pic}>
							{/* 외부 이미지 연결시 next.config.js파일에 이미지 protocol, hostname 등록해야함(next remotepatterns 참고), fill, sizes, priority도 등록해야함 */}
							{/* fill속성 적용시 무조건 부모요소에 position: relative, absolute, fixed 설정되어있어야함 */}
							<Image
								src={data.snippet.thumbnails.standard.url}
								fill
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								priority
								alt={data.snippet.title}
							/>
						</div>
					</article>
				);
			})}
		</section>
	);
}
