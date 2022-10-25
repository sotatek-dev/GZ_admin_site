import './WhiteListedUser.style.scss';
import React, { useEffect, useState } from 'react';
import { PaginationProps, Popconfirm } from 'antd';
import {
	Card,
	Col,
	Form,
	Input,
	Row,
	Table,
	Typography,
	Space,
} from '@common/components';
import { useGetNFTMintUsers } from '@settings/nft-mint/services/useGetNFTMintUsers';
import { MintPhase } from '@settings/nft-mint/types';
import {
	useDeleteWhiteListedUser,
	useUpdateWhitelistedUser,
} from './WhiteListedUser.mutation';
import UploadCSV from '@common/components/UploadCSV';
import { useUploadWhitelistUsers } from '@settings/nft-mint/services/useUploadWhitelistUsers';
import { DEFAULT_PAGINATION } from '@common/constants/pagination';
import { useGetCurrentPhase } from '@settings/nft-mint/services/useGetCurrentPhase';
import { useIsSuperAdmin } from '@common/hooks/useIsSuperAdmin';

interface DataType {
	_id: string;
	wallet_address: string;
	email: string;
}

interface Props {
	activePhaseTab: MintPhase;
}

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export default function UserList({ activePhaseTab }: Props) {
	const isSuperAdmin = useIsSuperAdmin();
	const [form] = Form.useForm<DataType>();
	const [editingKey, setEditingKey] = useState<string | number>('');
	const { updateWhitelistedUser } = useUpdateWhitelistedUser();
	const { uploadWhitelistUser } = useUploadWhitelistUsers();
	const { deleteWhiteListedUser } = useDeleteWhiteListedUser();
	const { currentPhase } = useGetCurrentPhase();
	const [page, setPage] = useState(1);

	const { data } = useGetNFTMintUsers({
		limit: DEFAULT_PAGINATION.limit,
		page,
		phase: activePhaseTab,
	});

	const [tempData, setTempData] = useState(data?.list);
	useEffect(() => {
		if (data) {
			setTempData(data.list);
		}
	}, [data]);

	const isEditing = (record: DataType) => record._id === editingKey;

	const edit = (record: DataType) => {
		form.setFieldsValue({ ...record });
		setEditingKey(record._id);
	};

	const cancel = () => {
		setEditingKey('');
	};

	const save = async (_id: React.Key) => {
		if (!tempData) {
			return;
		}

		try {
			const row = (await form.validateFields()) as DataType;

			const _tempData = [...tempData];
			const index = _tempData.findIndex((item) => _id === item._id);
			if (index > -1) {
				const item = _tempData[index];
				const updatedItem = {
					...item,
					...row,
				};
				_tempData.splice(index, 1, updatedItem);
				setTempData(_tempData);
				updateWhitelistedUser(updatedItem);
				setEditingKey('');
			} else {
				_tempData.push(row);
				setTempData(_tempData);
				setEditingKey('');
			}
		} catch (errInfo) {
			// eslint-disable-next-line no-console
			console.log('Validate Failed:', errInfo);
		}
	};

	const removeUser = async (_id: React.Key) => {
		if (!tempData) return;

		try {
			const row = (await form.validateFields()) as DataType;

			const _tempData = [...tempData];
			const index = _tempData.findIndex((item) => _id === item._id);
			if (index > -1) {
				_tempData.splice(index, 1);
				setTempData(_tempData);
				deleteWhiteListedUser(_id as string);
				setEditingKey('');
			} else {
				_tempData.push(row);
				setTempData(_tempData);
				setEditingKey('');
			}
		} catch (errInfo) {
			// eslint-disable-next-line no-console
			console.log('Validate Failed:', errInfo);
		}
	};

	const columns = [
		{
			title: 'Wallet',
			dataIndex: 'wallet_address',
			editable: true,
			width: '40%',
			render: (text: string) => (
				<Typography.Paragraph copyable={{ text }}>{text}</Typography.Paragraph>
			),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			editable: true,
			width: '40%',
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			width: '20%',
			render: (_: unknown, record: DataType) => {
				const editable = isEditing(record);

				return (
					<Space>
						{editable ? (
							<span>
								<Typography.Link
									onClick={() => save(record._id)}
									style={{ marginRight: 8 }}
								>
									Save
								</Typography.Link>
								<Popconfirm title='Sure to cancel?' onConfirm={cancel}>
									<a>Cancel</a>
								</Popconfirm>
							</span>
						) : (
							<Typography.Link
								disabled={!isSuperAdmin || editingKey !== ''}
								onClick={() => edit(record)}
							>
								Edit
							</Typography.Link>
						)}
						<span>
							<Typography.Link
								disabled={!isSuperAdmin || editingKey !== ''}
								onClick={() => removeUser(record._id)}
							>
								Remove
							</Typography.Link>
						</span>
					</Space>
				);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record: DataType) => ({
				record,
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	const onPageChange: PaginationProps['onChange'] = (current) => {
		setPage(current);
	};

	const isEnableAddWhitelist =
		currentPhase != undefined && currentPhase < activePhaseTab;

	return (
		<Row className='user-list'>
			<Col span={24}>
				<Card
					title='List Users'
					extra={
						<UploadCSV
							key={activePhaseTab}
							disabled={!isSuperAdmin || !isEnableAddWhitelist}
							onUploadSuccess={(file) =>
								uploadWhitelistUser({ phase: activePhaseTab, file })
							}
						/>
					}
				>
					<Form form={form} component={false}>
						<Table
							bordered
							components={{
								body: {
									cell: EditableCell,
								},
							}}
							columns={mergedColumns as ColumnTypes}
							dataSource={tempData}
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

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	index: number;
	editing: boolean;
	dataIndex: string;
	title: string;
	record: DataType;
	children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
	editing,
	dataIndex,
	title,
	children,
	...restProps
}) => {
	const inputNode = <Input />;

	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{ margin: 0 }}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};
