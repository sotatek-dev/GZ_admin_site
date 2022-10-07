import './MintedUsers.style.scss';
import React, { useState } from 'react';
import { Card, Col, Form, Row, Table } from '@common/components';
import { useGetNftUsers } from '@settings/nft-mint/services/useGetMintNftUsers';
import { MintPhase } from '@settings/nft-mint/types';
import { DEFAULT_PAGINATION } from '@common/constants/pagination';
import type { PaginationProps } from 'antd';

interface DataType {
	_id: React.Key;
	wallet_address: string;
	email: string;
}

interface Props {
	activePhaseTab: MintPhase;
}

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const columns: (ColumnTypes[number] & {
	editable?: boolean;
	dataIndex: string;
})[] = [
	{
		title: 'Wallet',
		dataIndex: 'wallet_address',
		width: 120,
	},
	{
		title: 'Email',
		dataIndex: 'email',
		width: 120,
	},
];

export default function UserList({ activePhaseTab }: Props) {
	const [form] = Form.useForm<DataType>();
	const [page, setPage] = useState(1);

	const { data } = useGetNftUsers({
		limit: DEFAULT_PAGINATION.limit,
		page,
		phase: activePhaseTab,
	});

	const onPageChange: PaginationProps['onChange'] = (current) => {
		setPage(current);
	};

	return (
		<Row className='user-list'>
			<Col span={24}>
				<Card title='List Users'>
					<Form form={form} component={false}>
						<Table
							bordered
							columns={columns}
							dataSource={data?.list}
							pagination={{
								defaultCurrent: 1,
								pageSize: data?.pagination.limit,
								total: data?.pagination.total,
								onChange: onPageChange,
							}}
							rowKey='_id'
						/>
					</Form>
				</Card>
			</Col>
		</Row>
	);
}
