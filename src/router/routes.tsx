import { Routes, Route, Navigate } from 'react-router-dom';
import { PATHS } from '@common/constants/paths';
import AppLayout from '@common/layouts/AppLayout';
import ConnectWallet from '@wallet/connect/ConnectWallet';
import SaleRoundList from '@sale-rounds/list';
import AdminList from '@admins/list';
import EditAdmin from '@admins/edit';
import CreateAdmin from '@admins/new';
import SettingNFTMint from '@settings/nft-mint';
import SystemSetting from '@settings/system';
import Users from '@users/index';
import Profile from 'src/modules/profile';
import SaleRoundCreate from '@sale-rounds/create';
import NotFoundPage from './components/404';
import { PrivateRoute } from './components/PrivateRoute';
import { SAPrivateRoute } from './components/SAPrivateRoute';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path={PATHS.connectWallet()} element={<ConnectWallet />} />
			<Route path='/' element={<Navigate to={PATHS.saleRounds.list()} />} />
			<Route
				path='/'
				element={
					<PrivateRoute>
						<AppLayout />
					</PrivateRoute>
				}
			>
				<Route path={PATHS.profile()} element={<Profile />} />
				<Route path={PATHS.saleRounds.list()} element={<SaleRoundList />} />
				<Route
					path={PATHS.saleRounds.create()}
					element={
						<SAPrivateRoute>
							<SaleRoundCreate />
						</SAPrivateRoute>
					}
				/>
				<Route path={PATHS.saleRounds.edit()} element={<SaleRoundCreate />} />
				<Route path={PATHS.admins.list()} element={<AdminList />} />
				<Route path={PATHS.admins.edit()} element={<EditAdmin />} />
				<Route
					path={PATHS.admins.new()}
					element={
						<SAPrivateRoute>
							<CreateAdmin />
						</SAPrivateRoute>
					}
				/>
				<Route path={PATHS.users()} element={<Users />} />
				<Route path={PATHS.settings.nftMint()} element={<SettingNFTMint />} />
				<Route path={PATHS.settings.system()} element={<SystemSetting />} />
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};
