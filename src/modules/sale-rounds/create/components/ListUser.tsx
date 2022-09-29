import './scss/ListUser.style.scss';
import { Checkbox } from 'antd';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import prevImgae from './icons/prev-icon.svg';
import nextImgae from './icons/next-icons.svg';
import copyIcon from './icons/copy-icon.svg';
import React, { useEffect, useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Upload } from 'antd';
import type { UploadProps } from 'antd';
import { message } from '@common/components';
import { getCookieStorage } from '@common/helpers/storage';
import {
	useSrWhiteListGet,
	APIsWhiteList,
	useSrWhiteListUpdate,
	useSrWhiteListDelete,
} from './services/whiteListUserGetUpdate';
import { Loading } from '@common/components';
import { Popconfirm } from 'antd';
import {
	Button,
	Form,
	Input,
	InputNumber,
	Table,
	Typography,
} from '@common/components';
import { useQueryClient } from 'react-query';

interface DataType {
	key: string;
	Wallet: string;
	Email: string;
}

interface PageingWhiteList {
	page: number;
	limit: number;
}

const pageDefault = () => ({
	page: 1,
	limit: 10,
});

const dataTable: DataType[] = [
	{
		key: '1',
		Wallet: 'John Brown',
		Email: 'New York No. 1 Lake Park',
	},
];

const itemRender: PaginationProps['itemRender'] = (
	page,
	type,
	originalElement
) => {
	if (type === 'prev') {
		return (
			<a>
				<img src={prevImgae} alt='' />
			</a>
		);
	}
	if (type === 'next') {
		return (
			<a>
				<img src={nextImgae} alt='' />
			</a>
		);
	}

	return originalElement;
};

export default function SaleRoundListUser(props: {
	isEveryCanJoin: (val: boolean) => void;
	isUpdated: boolean | undefined;
	idSaleRound: string | undefined;
}) {
	const [form] = Form.useForm<DataType>();
	const { isEveryCanJoin, isUpdated, idSaleRound } = props;
	const [checkedEvCanJoin, setCheckedEvCanJoin] = useState(true);
	const [editingKey, setEditingKey] = useState<string | number>('');
	const [_rowsTable, setRowsTable] = useState<DataType[]>([...dataTable]);
	const [payloadPaging, setPayloadPaging] =
		useState<PageingWhiteList>(pageDefault);
	// const [keyCount, setkeyCount] = useState<number>(0);
	const [pagingTotal, setPagingTotal] = useState<number>(0);
	const queryClient = useQueryClient();
	const { updateSrWhiteList } = useSrWhiteListUpdate();
	const { deleteSrWhiteList } = useSrWhiteListDelete();

	const isEditing = (record: DataType) => record.key === editingKey;

	const { data, isLoading } = useSrWhiteListGet(idSaleRound, payloadPaging);

	useEffect(() => {
		setRowsTable(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data?.list.map((el: any) => ({
				key: el._id,
				Wallet: el.wallet_address,
				Email: el.email,
			}))
		);
		if (data) {
			setPayloadPaging({
				...payloadPaging,
				page: data?.pagination?.page,
			});
			setPagingTotal(data?.pagination?.total);
		}
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
					id: key,
					email: row.Email,
					wallet_address: row.Wallet,
				},
				idSaleRound || ''
			);
			setEditingKey('');
			// setkeyCount(keyCount + 1);
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

	const copyWalletAddress = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			message.success('Copy Sucess');
		} catch (_err: unknown) {
			message.error('Failed to copy!');
		}
	};

	const columns = [
		{
			title: 'Wallet',
			dataIndex: 'Wallet',
			key: 'Wallet',
			editable: true,
			render: (text: string) => (
				<>
					<div className='w-100'>
						<div className='table-td-wallet d-flex'>
							<div className='d-flex justify-content-center align-items-center'>
								<span>{text}</span>
							</div>
							<div className='d-flex justify-content-center align-items-center'>
								<span
									onClick={() => copyWalletAddress(text)}
									className='icon-copy-wallet cursor-pointer'
								>
									<img src={copyIcon} alt='' />
								</span>
							</div>
						</div>
					</div>
				</>
			),
		},
		{
			title: 'Email',
			dataIndex: 'Email',
			key: 'Email',
			editable: true,
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
							title='Sure to remove'
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
		setCheckedEvCanJoin(e.target.checked);
		isEveryCanJoin(e.target.checked);
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
				message.error(`${info.file.name} file upload failed.`);
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
		<>
			<div className='sr-block-contents'>
				<div className='sale-round-title sr-listuser-title--h d-flex justify-content-space'>
					<div className='d-flex'>
						<span className='pr-18'>List User</span>
						<div>
							<Checkbox
								checked={checkedEvCanJoin}
								onChange={handlerCheckboxChange}
								className='sr-checkbox-user'
							>
								Everyone can join
							</Checkbox>
						</div>
					</div>
					<div>
						{!isUpdated && idSaleRound && (
							<div className='d-flex pr-105'>
								<Button className='mr-12 d-flex justify-content-center align-items-center'>
									<span>Reload all</span>
								</Button>
								<Upload {...propsUploadFile}>
									<Button className='d-flex justify-content-center align-items-center'>
										<span>Add CSV File</span>
									</Button>
								</Upload>
							</div>
						)}
					</div>
				</div>
				<div className='px-20 sr-listuser-showip--h'>
					<div className='sr-listuser-table--h'>
						<Form form={form} component={false}>
							<Table
								// key={`sr-listuser-table-${keyCount}`}
								bordered
								columns={mergedColumns}
								components={{
									body: {
										cell: EditableCell,
									},
								}}
								dataSource={_rowsTable}
								pagination={{ pageSize: 50, position: [] }}
								scroll={{ y: 395 }}
							/>
						</Form>
					</div>
					<div className='d-flex justify-content-end pr-32'>
						<Pagination
							onChange={handlerPageChange}
							defaultCurrent={payloadPaging.page}
							total={pagingTotal}
							pageSize={payloadPaging.limit}
							itemRender={itemRender}
						/>
					</div>
				</div>
			</div>
		</>
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
