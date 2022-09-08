import { Routes, Route } from 'react-router-dom';
import AppLayout from '@common/layouts/AppLayout';
import ConnectWallet from '@wallet/connect/ConnectWallet';
import SaleRoundList from '@sale-rounds/list/SaleRoundList';
import NotFoundPage from './components/404';
import { PrivateRoute } from './components/PrivateRoute';
import { PATHS } from '@common/constants/paths';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path={PATHS.connectWallet()} element={<ConnectWallet />} />
			<Route
				path='/'
				element={
					<PrivateRoute>
						<AppLayout />
					</PrivateRoute>
				}
			>
				<Route path='/admins' element={<SaleRoundList />} />
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};
