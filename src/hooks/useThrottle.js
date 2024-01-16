import { useRef } from 'react';

// setTimeout 호출되면 delay 시간뒤에 리턴값 반환되는게 아니라 호출 즉시 return 반환
// setTimeout의 delay값이 끝나기전에 중복호출되면 기존 함수를 무시하고 다시 초기화해서 setTimeout이 또 호출됨
export const useThrottle = () => {
	// 초기에 null값을 eventBlocker에 담아서 초기 한번은 온전하게 setTimeout이 호출되게 처리
	const eventBlocker = useRef(null);

	// 해당 Throttle적용함수가 핸들러나 useEffect안쪽에서 호출되어야할 경우가 있으므로
	// throttle적용하는 함수자체를 리턴하도록 코드 변경
	return (func, gap = 500) => {
		return () => {
			// eventBlocker 담겨있으면 리턴으로 강제 중지함으로써 setTimeout 중복호출하지 않음
			if (eventBlocker.current) return;
			// setTimeout 실행됨과 동시에 리턴값을 eventBlocker에 담아서 중복호출을 막으면서 gap시간 이후에 호출되는 특정 로직을 보장
			eventBlocker.current = setTimeout(() => {
				// gap시간 이후에 인수로 전달된 함수를 호출
				func();
				// eventBlocker값을 다시 비움 (==> gap시간 이후에 다시 setTimeout을 호출할 수 있게됨)
				eventBlocker.current = null;
			}, gap); //1초에 두번만 실행되게 하고싶으면 0.5초 적용
		};
	};
};
