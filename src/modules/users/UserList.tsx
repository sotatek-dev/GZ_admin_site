import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { PaginationProps } from 'antd/es/pagination';
import { Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useDebounce } from '@common/hooks';
import { Button, Input, Space, Col } from '@common/components';
import { ellipsisAddressText } from '@common/helpers/formats';
import { useGetUsers } from './UserList.query';
import { User } from './types';
import { Typography } from '@common/components';

const UserList = () => {
	const [searchVal, setSearchVal] = useState('');
	const [page, setPage] = useState(1);
	const debounceSearchVal = useDebounce(searchVal);
	const { isLoading, data } = useGetUsers(page, debounceSearchVal);

	const resetSearch = () => setSearchVal('');
	const onPageChange: PaginationProps['onChange'] = (current) => {
		setPage(current);
	};

	return (
		<>
			<Space>
				<Button onClick={resetSearch}>Reload all</Button>
			</Space>
			<Col span={6} offset={18}>
				<Input
					value={searchVal}
					onChange={(e) => setSearchVal(e.target.value)}
					placeholder='Search by wallet'
					suffix={<SearchOutlined />}
				/>
			</Col>
			<Table
				rowKey={'_id'}
				bordered
				columns={columns}
				dataSource={data?.list}
				loading={isLoading}
				pagination={{
					defaultCurrent: 1,
					pageSize: data?.pagination.limit,
					total: data?.pagination.total,
					onChange: onPageChange,
				}}
				className='admins-table'
			/>
		</>
	);
};

const columns: ColumnsType<User> = [
	{
		title: 'Wallet',
		dataIndex: 'wallet_address',
		width: '30%',
		render(data: string) {
			return (
				<Typography.Paragraph copyable={{ text: data }}>
					{ellipsisAddressText(data)}
				</Typography.Paragraph>
			);
		},
	},
	{
		title: 'Created At',
		dataIndex: 'created_at',
		width: '30%',
		render(value) {
			return dayjs(value).format('HH:mm YYYY/MM/DD');
		},
	},
	{
		title: 'Key Holding',
		dataIndex: 'key_holding',
		align: 'center',
		width: '20%',
		render(value) {
			return renderKeyHolding(value);
		},
	},
	{
		title: 'Number of dNFT Holding',
		dataIndex: 'nft_holding',
		width: '20%',
		align: 'center',
	},
];

const renderKeyHolding = (value: boolean) => (value ? 'Yes' : 'No');

export default UserList;
