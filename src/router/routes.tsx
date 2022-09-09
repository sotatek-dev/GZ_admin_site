import { Routes, Route } from 'react-router-dom';
import AppLayout from '@common/layouts/AppLayout';
import ConnectWallet from '@wallet/connect/ConnectWallet';
import NotFoundPage from './components/404';
import { PATHS } from '@common/constants/paths';
import AdminList from '@admins/list';
import EditAdmin from '@admins/edit';
import CreateAdmin from '@admins/new';
import { PrivateRoute } from './components/PrivateRoute';

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
				<Route path={PATHS.admins.list()} element={<AdminList />} />
				<Route path={PATHS.admins.edit()} element={<EditAdmin />} />
				<Route path={PATHS.admins.new()} element={<CreateAdmin />} />
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};
