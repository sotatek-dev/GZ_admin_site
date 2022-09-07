import { Routes, Route } from 'react-router-dom';
import ConnectWallet from '@wallet/connect/ConnectWallet';
import NotFoundPage from './404';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<ConnectWallet />} />
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	);
};
