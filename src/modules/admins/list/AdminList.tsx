import './AdminList.style.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { PaginationProps } from 'antd/es/pagination';
import type { Admin } from '@admins/common/types';
import { useGetAdmins } from './AdminList.query';
import { Button, Input, Col, Typography } from '@common/components';
import { PATHS } from '@common/constants/paths';
import { useDebounce } from '@common/hooks';

const AdminList = () => {
	const navigate = useNavigate();
	const [searchVal, setSearchVal] = useState('');
	const [page, setPage] = useState(1);
	const debounceSearchVal = useDebounce(searchVal);
	const { isLoading, data } = useGetAdmins(page, debounceSearchVal);

	const onPageChange: PaginationProps['onChange'] = (current) => {
		setPage(current);
	};

	return (
		<>
			<Button onClick={() => navigate(PATHS.admins.new())}>
				CREATE NEW ADMIN
			</Button>
			<Col span={6} offset={18}>
				<Input
					value={searchVal}
					onChange={(e) => setSearchVal(e.target.value)}
					placeholder='Search by Wallet, Email'
					suffix={<SearchOutlined />}
				/>
			</Col>
			<Table
				bordered
				columns={columns}
				dataSource={data?.list}
				onRow={(admin) => {
					return {
						onClick: () => navigate(PATHS.admins.edit(admin._id)),
					};
				}}
				pagination={{
					defaultCurrent: 1,
					pageSize: data?.pagination.limit,
					total: data?.pagination.total,
					onChange: onPageChange,
				}}
				loading={isLoading}
				className='admins-table'
			/>
		</>
	);
};

const columns: ColumnsType<Admin> = [
	{
		title: 'Wallet',
		dataIndex: 'wallet_address',
		render(value) {
			return <Typography.Paragraph copyable>{value}</Typography.Paragraph>;
		},
		width: '40%',
	},
	{
		title: 'Email',
		dataIndex: 'email',
		width: '30%',
	},
	{
		title: 'Name',
		dataIndex: 'full_name',
		width: '30%',
	},
];

export default AdminList;
