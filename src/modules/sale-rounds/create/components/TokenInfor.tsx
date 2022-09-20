import './scss/TokenInfor.style.scss';
import { Input, Form } from 'antd';
import { SRTokenInfor } from './types';

export default function SaleRoundTokenInfor(props: SRTokenInfor) {
	const { data, form } = props;
	console.log(data);

	return (
		<>
			<div className='sr-block-contents'>
				<div className={'sale-round-title sr-tokeninfor-title--h'}>
					Token Info
				</div>
				<div className='px-20 sr-tokeninfor-showip--h'>
					<Form form={form} layout='vertical' name='srTokenInfor'>
						<Form.Item
							name='symbol'
							className='pt-22 mb-0'
							label='Token Symbol'
							rules={[{ required: true }]}
						>
							<Input className='ip-sr-token-infor' placeholder='Basic usage' />
						</Form.Item>
						<Form.Item
							name='address'
							className='pt-22 mb-0'
							label='Address (Recieve Money)'
							rules={[{ required: true }]}
						>
							<Input className='ip-sr-token-infor' placeholder='Basic usage' />
						</Form.Item>
						<Form.Item
							name='total_sold_coin'
							className='pt-22 mb-0'
							label='Total Sold Coin'
							rules={[{ required: true }]}
						>
							<Input className='ip-sr-token-infor' placeholder='Basic usage' />
						</Form.Item>
						<Form.Item
							name='token_icon'
							className='pt-22'
							label='Token Icon'
							rules={[{ required: true }]}
						>
							<Input className='ip-sr-token-infor' placeholder='Basic usage' />
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
}
