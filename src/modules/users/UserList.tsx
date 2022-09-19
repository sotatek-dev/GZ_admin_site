import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useDebounce } from '@common/hooks';
import { Button, Input, Space, Col } from '@common/components';
import { elipsisAddressText } from '@common/helpers/formats';
import { useGetUsers } from './UserList.query';
import { User } from './types';
import { Typography } from '@common/components';

const UserList = () => {
	const [searchVal, setSearchVal] = useState('');
	const debounceSearchVal = useDebounce(searchVal);
	const { isLoading, data } = useGetUsers(debounceSearchVal);

	const resetSearch = () => setSearchVal('');

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
					current: data?.pagination.page,
					total: data?.pagination.total,
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
		render(data: string) {
			return (
				<Typography.Paragraph copyable={{ text: data }}>
					{elipsisAddressText(data)}
				</Typography.Paragraph>
			);
		},
	},
	{
		title: 'Created At',
		dataIndex: 'created_at',
		render(value) {
			return dayjs(value).format('HH:mm YYYY/MM/DD');
		},
	},
	{
		title: 'Key Holding',
		dataIndex: 'key_holding',
		render(value) {
			return renderKeyHolding(value);
		},
	},
	{
		title: 'Number of dNFT Holding',
		dataIndex: 'nft_holding',
	},
];

const renderKeyHolding = (value: boolean) => (value ? 'Yes' : 'No');

export default UserList;
