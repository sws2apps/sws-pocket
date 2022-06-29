import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isOnlineState } from '../../states/app';

const InternetChecker = () => {
	const setIsOnline = useSetRecoilState(isOnlineState);

	useEffect(() => {
		setIsOnline(window.navigator.onLine);
		window.addEventListener('online', (e) => {
			setIsOnline(true);
		});

		window.addEventListener('offline', (e) => {
			setIsOnline(false);
		});
	}, [setIsOnline]);
	return <></>;
};

export default InternetChecker;
