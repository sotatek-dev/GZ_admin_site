import './scss/ListUser.style.scss';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { Checkbox, Upload, Popconfirm, Pagination } from 'antd';
import { message } from '@common/components';
import { getCookieStorage } from '@common/helpers/storage';
import { MessageValidations } from '@common/constants/messages';
import { PageingWhiteList, DataTypePropsTable } from './types';
import {
	useSrWhiteListGet,
	APIsWhiteList,
	useSrWhiteListUpdate,
	useSrWhiteListDelete,
} from './services/whiteListUserGetUpdate';
import {
	Button,
	Form,
	Input,
	InputNumber,
	Table,
	Card,
	Typography,
	Loading,
} from '@common/components';
import {
	addressValidator,
	emailValidator,
	requiredValidate,
} from '@common/helpers/validate';
import { useQueryClient } from 'react-query';

interface DataType {
	key: string;
	Wallet: string;
	Email: string;
}

const pageDefault = () => ({
	page: 1,
	limit: 10,
});

const dataTable: DataType[] = [];

export default function SaleRoundListUser(props: {
	isEveryCanJoin: (val: boolean) => void;
	isUpdated: boolean | undefined;
	idSaleRound: string | undefined;
	isStateCanJoin: boolean;
}) {
	const [form] = Form.useForm<DataType>();
	const { isEveryCanJoin, isUpdated, idSaleRound, isStateCanJoin } = props;
	const [editingKey, setEditingKey] = useState<string | number>('');
	const [checkboxEveryCanJoin, setCheckboxEvryCanJoin] = useState<boolean>(
		!isStateCanJoin
	);
	const [_rowsTable, setRowsTable] = useState<DataType[]>([...dataTable]);
	const [payloadPaging, setPayloadPaging] =
		useState<PageingWhiteList>(pageDefault);
	const [pagingTotal, setPagingTotal] = useState<number>(0);
	const queryClient = useQueryClient();
	const { updateSrWhiteList } = useSrWhiteListUpdate();
	const { deleteSrWhiteList } = useSrWhiteListDelete();

	const isEditing = (record: DataType) => record.key === editingKey;

	const { data, isLoading } = useSrWhiteListGet(payloadPaging, idSaleRound);

	useEffect(() => {
		if (!data) return;
		setRowsTable(
			data?.list.map((el: DataTypePropsTable) => ({
				key: el._id,
				Wallet: el.wallet_address,
				Email: el.email,
			}))
		);
		// use case user remove item in table. Must update pagination if current page greater than page count. Set page_count into page
		if (data?.pagination?.page_count < payloadPaging.page) {
			setPayloadPaging({
				...payloadPaging,
				page: data?.pagination?.page_count,
			});
			setPagingTotal(data?.pagination?.total);
			return;
		}

		// use case page geater than page count
		setPayloadPaging({
			...payloadPaging,
			page: data?.pagination?.page,
		});
		setPagingTotal(data?.pagination?.total);
	}, [data]);

	const edit = (record: Partial<DataType> & { key: React.Key }) => {
		form.setFieldsValue({ Wallet: '', Email: '', ...record });
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey('');
	};

	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as DataType;

			await updateSrWhiteList(
				{
					_id: String(key),
					email: row.Email,
					wallet_address: row.Wallet,
				},
				idSaleRound || ''
			);
			setEditingKey('');
		} catch (errInfo) {
			// eslint-disable-next-line no-console
			console.log('Validate Failed:', errInfo);
		}
	};

	const handlerRemoveRows = async (
		record: Partial<DataType> & { key: React.Key }
	) => {
		await deleteSrWhiteList(record.key, idSaleRound || '');
	};

	const columns = [
		{
			title: 'Wallet',
			dataIndex: 'Wallet',
			key: 'Wallet',
			editable: true,
			width: 500,
			render: (data: string) => (
				<Typography.Paragraph copyable={{ text: data }}>
					{data}
				</Typography.Paragraph>
			),
		},
		{
			title: 'Email',
			dataIndex: 'Email',
			key: 'Email',
			editable: true,
			width: 350,
			render: (text: string) => (
				<>
					<div className='table-td-wallet d-flex pr-15'>
						<div className='d-flex justify-content-center align-items-center'>
							<span className='font-w-600'>{text}</span>
						</div>
					</div>
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			width: 200,
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
					<div>
						<Typography.Link
							disabled={editingKey !== ''}
							onClick={() => edit(record)}
						>
							Edit
						</Typography.Link>
						<Popconfirm
							className='pl-10'
							title='Are you sure to remove this address?'
							onConfirm={() => handlerRemoveRows(record)}
						>
							<a>Remove</a>
						</Popconfirm>
					</div>
				);
			},
		},
	];

	const handlerPageChange = (page: number) => {
		setPayloadPaging({ ...payloadPaging, page });
	};

	const handlerCheckboxChange = (e: CheckboxChangeEvent) => {
		isEveryCanJoin(e.target.checked);
		setCheckboxEvryCanJoin(e.target.checked);
	};
	const accessToken = getCookieStorage('access_token');

	const propsUploadFile: UploadProps = {
		name: 'file',
		accept: '.csv',
		action: `${process.env.REACT_APP_BASE_API_URL}/whitelisted-user/sale-round/${idSaleRound}`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		onChange(info) {
			if (info.file.status !== 'uploading') {
				// eslint-disable-next-line no-console
				console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`);
				queryClient.invalidateQueries([
					APIsWhiteList.getWhitelist(idSaleRound || ''),
				]);
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} ${MessageValidations.MSC_1_31}`);
			}
		},
		showUploadList: false,
		progress: {
			strokeColor: {
				'0%': '#108ee9',
				'100%': '#87d068',
			},
			strokeWidth: 3,
			format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
		},
	};

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

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Card
			title='List User'
			extra={
				<div className='d-flex justify-content-center align-items-center'>
					<Checkbox
						key={`isStateCanJoin-${checkboxEveryCanJoin}`}
						disabled={isUpdated}
						checked={checkboxEveryCanJoin}
						onChange={handlerCheckboxChange}
						className='sr-checkbox-user'
					>
						Everyone can join
					</Checkbox>
					<div className='d-flex pr-105'>
						<Upload disabled={!idSaleRound || isUpdated} {...propsUploadFile}>
							<Button
								disabled={!idSaleRound || isUpdated}
								className='d-flex justify-content-center align-items-center'
							>
								<span>Add CSV File</span>
							</Button>
						</Upload>
					</div>
				</div>
			}
		>
			<div className='px-20 sr-listuser-showip--h'>
				<div className='sr-listuser-table--h'>
					<Form form={form} component={false}>
						<Table
							bordered
							pagination={false}
							columns={mergedColumns}
							components={{
								body: {
									cell: EditableCell,
								},
							}}
							dataSource={_rowsTable}
							scroll={{ y: 305, x: 1050 }}
						/>
					</Form>
				</div>
				{pagingTotal > 0 && (
					<div className='d-flex justify-content-end pr-32'>
						<Pagination
							onChange={handlerPageChange}
							current={payloadPaging.page}
							total={pagingTotal}
							pageSize={payloadPaging.limit}
						/>
					</div>
				)}
			</div>
		</Card>
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
					rules={findRuleValidation(title)}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const objectRulesEditing = {
	Wallet: [
		requiredValidate(),
		{
			validator: addressValidator,
		},
	],
	Email: [
		requiredValidate(),
		{
			validator: emailValidator,
		},
	],
};

const findRuleValidation = (val: string) => {
	if (val === 'Wallet') return objectRulesEditing.Wallet;
	if (val === 'Email') return objectRulesEditing.Email;
	return [
		{
			required: true,
			message: `Please Input wallet address!`,
		},
	];
};
