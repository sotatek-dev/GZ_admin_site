import './UserList.style.scss';
import React, { useState } from 'react';
import { Popconfirm } from 'antd';
import {
	Button,
	Card,
	Col,
	Form,
	Input,
	InputNumber,
	Row,
	Table,
	Typography,
} from '@common/components';

interface DataType {
	key: React.Key;
	wallet_address: string;
	email: string;
}

const originData: DataType[] = [
	{
		key: '1',
		wallet_address: 'John Brown',
		email: 'test mail',
	},
];

export default function UserList() {
	const [form] = Form.useForm<DataType>();
	const [data, setData] = useState(originData);
	const [editingKey, setEditingKey] = useState<string | number>('');

	const isEditing = (record: DataType) => record.key === editingKey;

	const edit = (record: Partial<DataType> & { key: React.Key }) => {
		form.setFieldsValue({ wallet_address: '', email: '', ...record });
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey('');
	};

	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as DataType;

			const newData = [...data];
			const index = newData.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				setData(newData);
				setEditingKey('');
			} else {
				newData.push(row);
				setData(newData);
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
		},
		{
			title: 'Email',
			dataIndex: 'email',
			editable: true,
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			render: (_: unknown, record: DataType) => {
				const editable = isEditing(record);

				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.key)}
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
						disabled={editingKey !== ''}
						onClick={() => edit(record)}
					>
						Edit
					</Typography.Link>
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
				inputType: col.dataIndex === 'age' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	return (
		<Row className='user-list'>
			<Col span={24}>
				<Card title='List Users' extra={<Button>Add CSV file</Button>}>
					<Form form={form} component={false}>
						<Table
							bordered
							components={{
								body: {
									cell: EditableCell,
								},
							}}
							columns={mergedColumns}
							dataSource={data}
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
	inputType: 'number' | 'text';
	record: DataType;
	children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
	editing,
	dataIndex,
	title,
	inputType,
	children,
	...restProps
}) => {
	const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

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
