import './AppLayout.style.scss';
import type { MenuProps } from 'antd';
import {
	TagsOutlined,
	PictureOutlined,
	SolutionOutlined,
	TeamOutlined,
	SettingOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { PATHS } from '@common/constants/paths';
import { useActiveMenuKey } from './AppLayout.hooks';
import AdminLogo from './CurrentAdmin';
import { useAuth } from '@common/hooks/useAuth';

const { Sider, Content } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode
): MenuItem {
	return {
		key,
		icon,
		label,
	} as MenuItem;
}

export default function AppLayout() {
	const { signOut } = useAuth();

	const items: MenuItem[] = [
		getItem(
			<Link to={PATHS.saleRounds()}>Sale Round</Link>,
			PATHS.saleRounds(),
			<TagsOutlined />
		),
		getItem(
			<Link to={PATHS.settings.nftMint()}>Setting mint NFT</Link>,
			PATHS.settings.nftMint(),
			<PictureOutlined />
		),
		getItem(
			<Link to={PATHS.users()}>List User</Link>,
			PATHS.users(),
			<TeamOutlined />
		),
		getItem(
			<Link to={PATHS.admins.list()}>List Admin</Link>,
			PATHS.admins.list(),
			<SolutionOutlined />
		),
		getItem(
			<Link to={PATHS.settings.system()}>Setting</Link>,
			PATHS.settings.system(),
			<SettingOutlined />
		),
		getItem(
			<div onClick={signOut}>Logout</div>,
			PATHS.connectWallet(),
			<LogoutOutlined />
		),
	];

	const activePathKey = useActiveMenuKey();

	return (
		<Layout className='app-layout'>
			<Sider theme='dark' width='250' className='app-sider'>
				<AdminLogo />
				<Menu
					mode='inline'
					theme='dark'
					defaultSelectedKeys={[PATHS.saleRounds()]}
					items={items}
					className='app-sider-menu'
					selectedKeys={activePathKey}
				/>
			</Sider>
			<Content className='app-content'>
				<Outlet />
			</Content>
		</Layout>
	);
}
