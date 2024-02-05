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

/*
	헤더의 모바일메뉴 토글 버튼 클릭시 출력되는 컴포넌트 (app > layout.jsx 에서 호출됨)
	- 헤더의 토글버튼 클릭으로 인해 변경되는 전역 state값에 따라 화면에 출력되는 모바일 전용 메뉴 패널
	- 브라우저가 리사이즈시 모바일 화면이 넘어가면 자동으로 닫히도록 이벤트 연결후 throttling처리
*/
