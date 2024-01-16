'use client';

import clsx from 'clsx';
import styles from './mobileMenu.module.scss';
import { useGlobalData } from '@/hooks/useGlobalData';
import { useEffect } from 'react';
import { useThrottle } from '@/hooks/useThrottle';

export default function MobileMenu() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	// useThrottle hook으로부터 throttling적용함수 반환
	const setThrottle = useThrottle();

	useEffect(() => {
		const closeMenu = () => window.innerWidth >= 1000 && setMenuOpen(false);
		const throttled = setThrottle(closeMenu, 300);
		window.addEventListener('resize', throttled);
		return () => window.removeEventListener('resize', throttled);
	}, [setMenuOpen, setThrottle]);

	return (
		<>
			{MenuOpen && (
				<div className={clsx(styles.mobileMenu)} onClick={() => setMenuOpen(false)}>
					<h1>Mobile Menu</h1>
				</div>
			)}
		</>
	);
}
