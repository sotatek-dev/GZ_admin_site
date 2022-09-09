import './AdminList.style.scss';
import type { ColumnsType } from 'antd/es/table';
import type { Admin } from '../common/types';
import { Table } from 'antd';
import { useGetAdmins } from './AdminList.query';
import { Button } from '@common/components';
import { useNavigate } from 'react-router';
import { PATHS } from '@common/constants/paths';

const columns: ColumnsType<Admin> = [
	{
		title: 'Wallet',
		dataIndex: 'wallet_address',
		sorter: {
			compare: (prev, next) =>
				prev.wallet_address.localeCompare(next.wallet_address),
			multiple: 1,
		},
	},
	{
		title: 'Email',
		dataIndex: 'email',
		sorter: {
			compare: (prev, next) => prev.email.localeCompare(next.email),
			multiple: 2,
		},
	},
	{
		title: 'Name',
		dataIndex: 'username',
		sorter: {
			compare: (prev, next) => prev.username.localeCompare(next.username),
			multiple: 3,
		},
	},
];

// TODO: Pagination, searching, copy address
const AdminList = () => {
	const navigate = useNavigate();
	const { isLoading, data } = useGetAdmins();

	return (
		<>
			<Button onClick={() => navigate(PATHS.admins.new())}>
				CREATE NEW ADMIN
			</Button>
			<Table
				columns={columns}
				dataSource={data?.list}
				onRow={(admin) => {
					return {
						onClick: () => navigate(PATHS.admins.edit(admin._id)),
					};
				}}
				loading={isLoading}
				className='admins-table'
			/>
		</>
	);
};

export default AdminList;
