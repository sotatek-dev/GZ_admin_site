import { Routes, Route, Navigate } from 'react-router-dom';
import { PATHS } from '@common/constants/paths';
import AppLayout from '@common/layouts/AppLayout';
import ConnectWallet from '@wallet/connect/ConnectWallet';
import AdminList from '@admins/list';
import EditAdmin from '@admins/edit';
import CreateAdmin from '@admins/new';
import SettingNFTMint from '@settings/nft-mint';
import NotFoundPage from './components/404';
import { PrivateRoute } from './components/PrivateRoute';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigate to={PATHS.admins.list()} />} />
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
				<Route path={PATHS.settings.nftMint()} element={<SettingNFTMint />} />
			</Route>
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	);
};
