import clsx from 'clsx';
import styles from './userInfo.module.scss';
import { getUser } from '@/lib/actions';
import Image from 'next/image';

export default async function UserInfo({ name }) {
	const user = await getUser(name);
	return (
		<>
			{user && (
				<article className={clsx(styles.userInfo)}>
					<p>{user?.email}</p>
					<div className={styles.pic}>
						<Image src={user?.img} width={50} height={50} alt={user?.email} />
					</div>
				</article>
			)}
		</>
	);
}
