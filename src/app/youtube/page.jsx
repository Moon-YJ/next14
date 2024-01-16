import clsx from 'clsx';
import styles from './youtube.module.scss';
import YoutubeCard from '@/components/youtubeCard/YoutubeCard';

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
	const data = await fetchYoutube();
	return (
		<section className={clsx(styles.youtube)}>
			<h1>Youtube</h1>
			{data.items.map((data, idx) => {
				if (idx < 4) return <YoutubeCard key={data.id} data={data} isPriority={true} />;
				return <YoutubeCard key={data.id} data={data} isPriority={false} />;
			})}
		</section>
	);
}
