import clsx from 'clsx';
import styles from './unsplash.module.scss';
import Image from 'next/image';

async function fetchUnsplash() {
	const api_key = process.env.NEXT_PUBLIC_UNSPLASH_API;
	const count = 18;
	const url = `https://api.unsplash.com/photos/random?client_id=${api_key}&count=${count}`;
	const data = await fetch(url);
	const json = await data.json();
	return json;
}

export default async function Unsplash() {
	const data = await fetchUnsplash();
	console.log(data);
	return (
		<aside className={clsx(styles.unsplash)}>
			<h1>Unsplash</h1>
			<div>
				{data.map((pic, idx) => {
					return (
						<p key={pic.id}>
							<Image src={pic.urls.thumb} alt={pic.alt_description} priority fill sizes='(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw' />
						</p>
					);
				})}
			</div>
		</aside>
	);
}
