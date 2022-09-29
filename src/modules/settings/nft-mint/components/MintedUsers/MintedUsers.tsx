import './MintedUsers.style.scss';
import React from 'react';
import { Card, Col, Form, Row, Table } from '@common/components';
import { useGetNftUsers } from '@settings/nft-mint/services/useGetMintNftUsers';
import { MintPhase } from '@settings/nft-mint/types';

interface DataType {
	_id: React.Key;
	wallet_address: string;
	email: string;
}

interface Props {
	activePhaseTab: MintPhase;
}

export default function UserList({ activePhaseTab }: Props) {
	const [form] = Form.useForm<DataType>();
	const { data } = useGetNftUsers({
		limit: 100,
		page: 1,
		phase: activePhaseTab,
	});

	const columns = [
		{
			title: 'Wallet',
			dataIndex: 'wallet_address',
			editable: true,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			editable: true,
		},
	];

	return (
		<Row className='user-list'>
			<Col span={24}>
				<Card title='List Users'>
					<Form form={form} component={false}>
						<Table
							bordered
							columns={columns}
							dataSource={data?.list}
							rowKey='_id'
						/>
					</Form>
				</Card>
			</Col>
		</Row>
	);
}
