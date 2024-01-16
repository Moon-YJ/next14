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
				<Link href={`/detail/${data.id}`} prefetch={isPrefetch}>
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
