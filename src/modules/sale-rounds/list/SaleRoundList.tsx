import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Table } from 'antd';
import { useNavigate } from 'react-router';
import { Button, Space } from '@common/components';
import { PATHS } from '@common/constants/paths';
import { useGetSaleRounds } from './SaleRoundList.query';
import { SaleRound } from './types';

const columns: ColumnsType<SaleRound> = [
	{
		title: 'Wallet',
		dataIndex: 'wallet_address',
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
			return value ? 'Yes' : 'No';
		},
	},
	{
		title: 'Number of dNFT Holding',
		dataIndex: 'nft_holding',
	},
];

// TODO: Pagination, searching, copy address
const AdminList = () => {
	const navigate = useNavigate();
	const { isLoading, data } = useGetSaleRounds();

	return (
		<>
			<Space>
				<Button onClick={() => navigate(PATHS.admins.new())}>
					Export to CSV
				</Button>
				<Button onClick={() => navigate(PATHS.admins.new())}>Reload all</Button>
			</Space>
			<Table
				bordered
				columns={columns}
				dataSource={data?.list}
				loading={isLoading}
				className='admins-table'
			/>
		</>
	);
};

export default AdminList;
