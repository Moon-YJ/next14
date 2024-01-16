'use client';

import clsx from 'clsx';
import styles from './mobileMenu.module.scss';
import { useGlobalData } from '@/hooks/useGlobalData';
import { useEffect } from 'react';

export default function MobileMenu() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	useEffect(() => {
		const closeMenu = () => {
			window.innerWidth >= 1000 && setMenuOpen(false);
		};
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [setMenuOpen]);

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
