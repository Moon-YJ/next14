'use client';

import { createContext, useContext, useState } from 'react';

// 전역 데이터 객체 생성
export const GlobalContext = createContext(null);

// 전역객체 생성후 특정 state값들을 내부로 전달해주는 wrapping component 생성
export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);
	const [ImgPanelOpen, setImgPanelOpen] = useState(false);
	const [ImgUrl, setImgUrl] = useState('');

	return (
		<GlobalContext.Provider value={{ MenuOpen, setMenuOpen, ImgPanelOpen, setImgPanelOpen, ImgUrl, setImgUrl }}>{children}</GlobalContext.Provider>
	);
}

// GlobalContext의 값을 호출할 수 있는 custom hook
// useContext로 반환한 전체 전역 데이터를 내보내는 custom hook 생성 후 export
export function useGlobalData() {
	return useContext(GlobalContext);
}

/*
  - children으로 자식요소 전체를 감싸고 있는 클라이언트 컴포넌트인 부모요소가 서버 컴포넌트인 자식요소를 wrapping해도 자식요소는 서버 컴포넌트 유지됨

  - 반대의 경우도 마찬가지(자식이 클라이언트 컴포넌트고 부모요소가 서버 컴포넌트인 경우도 각각 유지됨)

  - 컴포넌트를 쪼갤수록 브라우저의 역할(use client)을 줄일 수 있으므로 권장
*/
