import './scss/ListUser.style.scss';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { ColumnsType } from 'antd/es/table';
import { Space, Table } from 'antd';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import prevImgae from './icons/prev-icon.svg';
import nextImgae from './icons/next-icons.svg';
import copyIcon from './icons/copy-icon.svg';

const onChange = (e: CheckboxChangeEvent) => {
	console.log(`checked = ${e.target.checked}`);
};

interface DataType {
	key: string;
	Wallet: string;
	Email: string;
}

const columns: ColumnsType<DataType> = [
	{
		title: 'Wallet',
		dataIndex: 'Wallet',
		key: 'Wallet',
		render: (text) => (
			<>
				<div className='w-100'>
					<div className='table-td-wallet d-flex'>
						<div className='d-flex justify-content-center align-items-center'>
							<span>{text}</span>
						</div>
						<div className='d-flex justify-content-center align-items-center'>
							<span className='icon-copy-wallet cursor-pointer'>
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
		render: (text) => (
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
		render: (_, record) => (
			<Space size='middle'>
				<a>Invite {record.Wallet}</a>
				<a>Delete</a>
			</Space>
		),
	},
];

const data: DataType[] = [
	{
		key: '1',
		Wallet: 'John Brown',
		Email: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		Wallet: 'Jim Green',
		Email: 'London No. 1 Lake Park',
	},
	{
		key: '3',
		Wallet: 'Joe Black',
		Email: 'Sidney No. 1 Lake Park',
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

export default function SaleRoundListUser() {
	return (
		<>
			<div className='sr-block-contents'>
				<div
					className={
						'sale-round-title sr-listuser-title--h d-flex justify-content-space'
					}
				>
					<div className='d-flex'>
						<span className='pr-18'>List User</span>
						<div>
							<Checkbox className='sr-checkbox-user' onChange={onChange}>
								Everyone can join
							</Checkbox>
						</div>
					</div>
					<div>
						<div className='d-flex pr-105'>
							<div className='mr-12 btn-sale-round-create btn-userlist-reload d-flex justify-content-center align-items-center'>
								<span>Reload all</span>
							</div>
							<div className='d-flex justify-content-center align-items-center btn-userlist-addcsv'>
								<span>Add CSV File</span>
							</div>
						</div>
					</div>
				</div>
				<div className='px-20 sr-listuser-showip--h'>
					<div className='sr-listuser-table--h'>
						<Table
							bordered={false}
							columns={columns}
							dataSource={data}
							pagination={{ pageSize: 50, position: [] }}
							scroll={{ y: 395 }}
						/>
					</div>
					<div className='d-flex justify-content-end pr-32'>
						<Pagination
							defaultCurrent={1}
							total={500}
							pageSize={1}
							itemRender={itemRender}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
