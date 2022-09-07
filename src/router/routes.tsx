import { Routes, Route } from 'react-router-dom';
import AppLayout from '@common/layouts/AppLayout';
import ConnectWallet from '@wallet/connect/ConnectWallet';
import SaleRoundList from '@sale-rounds/list/SaleRoundList';
import NotFoundPage from './404';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/connect-wallet' element={<ConnectWallet />} />
			<Route path='/' element={<AppLayout />}>
				<Route path='/admins' element={<SaleRoundList />} />
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};
