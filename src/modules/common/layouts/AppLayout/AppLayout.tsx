import './AppLayout.style.scss';
import { useLocation } from 'react-router';
import { matchPath } from 'react-router';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { PATHS } from '@common/constants/paths';
import AdminLogo from './CurrentAdmin';

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

const items: MenuItem[] = [
	getItem(<Link to={PATHS.saleRounds()}>Sale Round</Link>, PATHS.saleRounds()),
	getItem('Setting Mint NFT', '2'),
	getItem('List User', '3'),
	getItem(
		<Link to={PATHS.admins.list()}>List Admin</Link>,
		PATHS.admins.list()
	),
	getItem('Setting', '5'),
	getItem('Logout', '6'),
];

const MENUS = [PATHS.admins.list(), PATHS.saleRounds()];

const useActiveMenuKey = () => {
	const location = useLocation();

	const activeKey = MENUS.filter((path) => {
		const match = matchPath(path, location.pathname);
		return !!match;
	});

	return activeKey;
};

export default function AppLayout() {
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
