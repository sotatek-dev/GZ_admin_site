import { Routes, Route } from 'react-router-dom';
import AppLayout from '@common/layouts/AppLayout';
import ConnectWallet from '@wallet/connect/ConnectWallet';
import NotFoundPage from './components/404';
import { PATHS } from '@common/constants/paths';
import AdminList from 'src/modules/admins/list';
import EditAdmin from 'src/modules/admins/edit';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path={PATHS.connectWallet()} element={<ConnectWallet />} />
			<Route path='/' element={<AppLayout />}>
				<Route path={PATHS.admins.list()} element={<AdminList />} />
				<Route path={PATHS.admins.edit()} element={<EditAdmin />} />
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};
