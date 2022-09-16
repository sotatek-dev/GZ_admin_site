import dayjs from 'dayjs';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router';
import { Button, Space } from '@common/components';
import { PATHS } from '@common/constants/paths';
import { useGetSaleRounds } from './SaleRoundList.query';
import { SaleRoundStatusLabel } from './SaleRoundList.constants';
import { SaleRound } from './types';

const columns: ColumnsType<SaleRound> = [
	{
		title: 'Round Name',
		dataIndex: 'name',
		sorter: {
			compare: (prev, next) => prev.name.localeCompare(next.name),
			multiple: 1,
		},
	},
	{
		title: 'Start',
		dataIndex: ['buy_time', 'start_time'],
		render(value: SaleRound['buy_time']['start_time']) {
			return dayjs.unix(value).format('HH:mm YYYY/MM/DD');
		},
		sorter: {
			compare: (prev, next) =>
				prev.buy_time.start_time - next.buy_time.start_time,
			multiple: 2,
		},
	},
	{
		title: 'Finish',
		dataIndex: ['buy_time', 'end_time'],
		render(value: SaleRound['buy_time']['end_time']) {
			return dayjs.unix(value).format('HH:mm YYYY/MM/DD');
		},
		sorter: {
			compare: (prev, next) => prev.buy_time.end_time - next.buy_time.end_time,
			multiple: 3,
		},
	},
	{
		title: 'Token Symbol',
		dataIndex: 'token_info',
		render(value: SaleRound['token_info']) {
			return value.symbol;
		},
		sorter: {
			compare: (prev, next) =>
				prev.token_info.symbol.localeCompare(next.token_info.symbol),
			multiple: 4,
		},
	},
	{
		title: 'Status',
		dataIndex: 'status',
		render(value: SaleRound['status']) {
			return SaleRoundStatusLabel[value];
		},
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
					Create new sale round
				</Button>
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
