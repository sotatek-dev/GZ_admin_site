import './AppLayout.style.scss';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router';

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
	getItem('Sale Round', '1'),
	getItem('Setting Mint NFT', '2'),
	getItem('List User', '3'),
	getItem('List Admin', '4'),
	getItem('Setting', '5'),
	getItem('Logout', '6'),
];

export default function AppLayout() {
	return (
		<Layout className='app-layout'>
			<Sider collapsible theme='dark' className='app-sider'>
				<div className='logo' />
				<Menu
					mode='inline'
					theme='dark'
					defaultSelectedKeys={['1']}
					items={items}
					className='app-sider-menu'
				/>
			</Sider>
			<Content className='app-content'>
				<Outlet />
			</Content>
		</Layout>
	);
}
