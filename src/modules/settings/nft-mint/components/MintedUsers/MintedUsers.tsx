import './MintedUsers.style.scss';
import copyIcon from 'src/assets/icons/copy-icon.svg';
import React, { useState } from 'react';
import { Card, Col, Form, Row, Table } from '@common/components';
import { useGetNftUsers } from '@settings/nft-mint/services/useGetMintNftUsers';
import { MintPhase } from '@settings/nft-mint/types';
import { copyWalletAddress } from '@common/helpers/converts';
import { DEFAULT_PAGINATION } from '@common/constants/pagination';
import { Tooltip } from 'antd';
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
		render: (text: string) => (
			<>
				<div className='d-flex'>
					<div className='d-flex justify-content-center align-items-center'>
						<span>{text}</span>
					</div>
					<div className='d-flex justify-content-center align-items-center'>
						<Tooltip title='copy'>
							<span
								onClick={() => copyWalletAddress(text)}
								className='icon-copy-wallet cursor-pointer'
							>
								<img src={copyIcon} alt='' />
							</span>
						</Tooltip>
					</div>
				</div>
			</>
		),
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
