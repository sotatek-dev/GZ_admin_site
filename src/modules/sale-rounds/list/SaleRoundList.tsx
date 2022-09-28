import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import { RedoOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { Button, Space, Table, Row, message } from '@common/components';
import { PATHS } from '@common/constants/paths';
import { useGetSaleRounds } from './SaleRoundList.query';
import { SaleRoundStatusLabel } from './SaleRoundList.constants';
import { SaleRound } from './types';
import { MESSAGES } from '@common/constants/messages';

const columns: ColumnsType<SaleRound> = [
	{
		title: 'Round Name',
		dataIndex: 'name',
	},
	{
		title: 'Start',
		dataIndex: ['buy_time', 'start_time'],
		render(value: SaleRound['buy_time']['start_time']) {
			return dayjs.unix(value).format('HH:mm YYYY/MM/DD');
		},
	},
	{
		title: 'Finish',
		dataIndex: ['buy_time', 'end_time'],
		render(value: SaleRound['buy_time']['end_time']) {
			return dayjs.unix(value).format('HH:mm YYYY/MM/DD');
		},
	},
	{
		title: 'Token Symbol',
		dataIndex: 'token_info',
		render(value: SaleRound['token_info']) {
			return value.symbol;
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

const AdminList = () => {
	const navigate = useNavigate();
	const { isLoading, data, refetch, error } = useGetSaleRounds();

	const handleRefreshList = async () => {
		await refetch();

		if (!error) {
			message.success(MESSAGES.MC4);
		}
	};

	return (
		<>
			<Space>
				<Button onClick={() => navigate(PATHS.saleRounds.create())}>
					Create new sale round
				</Button>
			</Space>
			<Row justify='end'>
				<Button onClick={handleRefreshList} icon={<RedoOutlined />}>
					Click to refresh pool
				</Button>
			</Row>
			<Table
				bordered
				onRow={(el) => {
					return {
						onClick: () => navigate(PATHS.saleRounds.edit(el._id)),
					};
				}}
				pagination={false}
				columns={columns}
				dataSource={data?.list}
				loading={isLoading}
				className='admins-table'
			/>
		</>
	);
};

export default AdminList;
