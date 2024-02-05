import clsx from 'clsx';
import styles from './youtubeCard.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useCustomText } from '@/hooks/useText';

export default function YoutubeCard({ data, isPriority, isPrefetch }) {
	const shortenText = useCustomText('shorten');
	const customText = useCustomText('combined');
	const [date, _] = data.snippet.publishedAt.split('T');

	return (
		<article className={clsx(styles.youtubeCard)}>
			<div className={styles.pic}>
				{/* 외부 이미지 연결시 next.config.js파일에 이미지 protocol, hostname 등록해야함(next remotepatterns 참고), fill, sizes, priority도 등록해야함 */}
				{/* fill속성 적용시 무조건 부모요소에 position: relative, absolute, fixed 설정되어있어야함 */}
				<Link href={`/youtube/${data.id}`} prefetch={isPrefetch}>
					<Image
						src={data.snippet.thumbnails.standard.url}
						alt={data.snippet.title}
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						priority={isPriority}
					/>
				</Link>
			</div>
			<h2>{shortenText(data.snippet.title, 50)}</h2>
			<div className={styles.txt}>
				<p>{shortenText(data.snippet.description, 250)}</p>
				<div className={styles.infoBox}>
					<span>{customText(date, '.')}</span>
					{/* <em>{time.split('Z')[0]}</em> */}
				</div>
			</div>
		</article>
	);
}

/*
	Youtube Page컴포넌트에서 서버쪽에서 fetching된 데이터로 각각의 썸네일 목록 출력 (app > youtube > page.jsx에서 호출됨)
	- props로 데이터 배열, isPriority , isPrefetch정보를 전달받아
	- 목록을 출력하면서 특정 순번의 포스트목록의 이미지까지만 priority 설정
	- 특정 순번의 포스트목록까지만 Link에 prefetch 설정
*/
