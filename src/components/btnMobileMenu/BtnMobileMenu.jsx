'use client';

import clsx from 'clsx';
import styles from './btnMobileMenu.module.scss';
import { FaBarsStaggered } from 'react-icons/fa6';
import { useGlobalData } from '@/hooks/useGlobalData';

export default function BtnMobileMenu() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	return <FaBarsStaggered color='#333' className={clsx(styles.btnMobileMenu)} onClick={() => setMenuOpen(!MenuOpen)} />;
}
