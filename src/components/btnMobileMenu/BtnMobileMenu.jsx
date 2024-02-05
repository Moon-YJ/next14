'use client';
import clsx from 'clsx';
import styles from './btnMobileMenu.module.scss';
import { FaBarsStaggered } from 'react-icons/fa6';
import { useGlobalData } from '@/hooks/useGlobalData';

export default function BtnMobileMenu() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	return <FaBarsStaggered color='#333' className={clsx(styles.btnMobileMenu)} onClick={() => setMenuOpen(!MenuOpen)} />;
}

/*
	헤더에서 모바일 패널 호출하는 토글 버튼 컴포넌트 (components > Header.jsx)
	- 메뉴패널 호출을 위한 전역 데이터 훅을 호출해야 되므로 client방식으로 동작
	- useGlobalData훅에서 메뉴 패널을 열기위한 전역 state와 state변경함수 가져옴 (hooks > useGlobalData.js)
*/
