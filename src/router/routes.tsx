import { Routes, Route, Navigate } from 'react-router-dom';
import { PATHS } from '@common/constants/paths';
import AppLayout from '@common/layouts/AppLayout';
import ConnectWallet from '@wallet/connect/ConnectWallet';
import AdminList from '@admins/list';
import EditAdmin from '@admins/edit';
import CreateAdmin from '@admins/new';
import SettingNFTMint from '@settings/nft-mint';
import SystemSetting from '@settings/system';
import Users from '@users/index';
import SaleRoundList from '@sale-rounds/list';
import SaleRoundCreate from '@sale-rounds/create';
import NotFoundPage from './components/404';
import { PrivateRoute } from './components/PrivateRoute';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path={PATHS.connectWallet()} element={<ConnectWallet />} />
			<Route path={PATHS.saleRounds.list()} element={<SaleRoundList />} />
			<Route path={PATHS.saleRounds.create()} element={<SaleRoundCreate />} />
			<Route path='/' element={<Navigate to={PATHS.admins.list()} />} />
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
				<Route path={PATHS.users()} element={<Users />} />
				<Route path={PATHS.settings.nftMint()} element={<SettingNFTMint />} />
				<Route path={PATHS.settings.system()} element={<SystemSetting />} />
			</Route>
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	);
};
