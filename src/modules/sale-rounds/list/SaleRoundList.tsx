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
import { useState } from 'react';
import { useIsSuperAdmin } from '@common/hooks/useIsSuperAdmin';

interface PageingWhiteList {
	page: number;
	limit: number;
	sortBy: string;
	direction: string;
}

const pageDefault = (): PageingWhiteList => ({
	page: 1,
	limit: 10,
	sortBy: 'created_at',
	direction: 'desc',
});

const columns: ColumnsType<SaleRound> = [
	{
		title: 'Round Name',
		dataIndex: 'name',
	},
	{
		title: 'Start',
		dataIndex: ['buy_time', 'start_time'],
		render(value: SaleRound['buy_time']['start_time']) {
			return value ? dayjs.unix(value).format('HH:mm YYYY/MM/DD') : 'TBA';
		},
	},
	{
		title: 'Finish',
		dataIndex: ['buy_time', 'end_time'],
		render(value: SaleRound['buy_time']['end_time']) {
			return value ? dayjs.unix(value).format('HH:mm YYYY/MM/DD') : 'TBA';
		},
	},
	{
		title: 'Token Symbol',
		dataIndex: 'token_info',
		render(value: SaleRound['token_info']) {
			return value.symbol || 'GXZ';
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
	const isSuperAdmin = useIsSuperAdmin();

	const [payloadPaging, setPayloadPaging] =
		useState<PageingWhiteList>(pageDefault);
	const { isLoading, data, refetch, error } = useGetSaleRounds(payloadPaging);

	const handleRefreshList = async () => {
		await refetch();

		if (!error) {
			message.success(MESSAGES.MSC22);
		}
	};

	const handlerPageChange = (page: number, pageSize: number) => {
		setPayloadPaging({ ...payloadPaging, page, limit: pageSize });
	};

	return (
		<>
			<Space>
				{isSuperAdmin && (
					<Button onClick={() => navigate(PATHS.saleRounds.create())}>
						Create new sale round
					</Button>
				)}
			</Space>
			<Row justify='end'>
				<Button onClick={handleRefreshList} icon={<RedoOutlined />}>
					Click to refresh pool
				</Button>
			</Row>
			<Table
				rowKey='_id'
				bordered
				onRow={(el) => {
					return {
						onClick: () => navigate(PATHS.saleRounds.edit(el._id)),
					};
				}}
				scroll={{ y: 705 }}
				pagination={{
					onChange: handlerPageChange,
					current: payloadPaging.page,
					pageSize: payloadPaging.limit,
					total: data?.pagination.total,
				}}
				columns={columns}
				dataSource={data?.list}
				loading={isLoading}
				className='admins-table'
			/>
		</>
	);
};

export default AdminList;
