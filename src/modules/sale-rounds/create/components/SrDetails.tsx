import './scss/SrDetails.style.scss';
import aboutIcon from './icons/about-icon.svg';
import { Input, Radio, Form, Tooltip } from 'antd';
import { SRDetailProps } from './types';

export default function SaleRoundBoxDetails(props: SRDetailProps) {
	const { data, form } = props;

	return (
		<>
			<div className='sr-block-contents'>
				<div className={'sale-round-title sr-showdetail-title--h'}>
					Sale Round details
				</div>
				<div className='px-20 sale-round-contents sr-showdetail-showip--h'>
					<Form form={form} layout='vertical' name='srDetailForm'>
						<Form.Item
							name='network'
							label='Network available'
							className='mb-0 pt-12'
							initialValue={data.network}
						>
							<Radio.Group>
								<Radio value={'BSC'}>BSC</Radio>
								<Radio value={'Test'}>Test</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							name='buyLimit'
							label={
								<div className='SR-contents-title d-flex'>
									<span className={'pr-4'}>Buy Limit (BUSD)</span>
									<div className={'d-flex align-items-center'}>
										<Tooltip
											placement='bottom'
											title={'Set this value to 0 for no limitation'}
										>
											<img src={aboutIcon} alt='' />
										</Tooltip>
									</div>
								</div>
							}
							className='pt-14 mb-9'
							initialValue={data.buy_limit}
						>
							<Input
								className='ip-sale-round-detail'
								placeholder='Basic usage'
							/>
						</Form.Item>
						<Form.Item
							name='address'
							className='mb-22'
							label='Address (Recieve Money)'
							initialValue={data.address}
						>
							<Input className='ip-sr-token-infor' placeholder='Basic usage' />
						</Form.Item>
						<Form.Item
							name='otal_sold_coin'
							className='mb-22'
							label='Total Sold Coin'
							rules={[{ required: true }]}
							initialValue={data.tottal_sold_coin}
						>
							<Input className='ip-sr-token-infor' placeholder='Basic usage' />
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
}
