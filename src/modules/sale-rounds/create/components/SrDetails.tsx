import './scss/SrDetails.style.scss';
// import aboutIcon from './icons/about-icon.svg';
import { Input, Radio, Form } from 'antd';
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
							initialValue={data.network}
						>
							<Radio.Group>
								<Radio value={'BSC'}>BSC</Radio>
								<Radio value={'Test'}>Test</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item name='buyLimit' label='Buy Limit (BUSD)'>
							<Input
								className='ip-sale-round-detail'
								placeholder='Basic usage'
							/>
						</Form.Item>
						{/* <div>
							<div className='SR-contents-title d-flex pt-10 pb-10'>
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
							<Input className='ip-sale-round-detail' placeholder='Basic usage' />
						</div> */}
					</Form>
				</div>
			</div>
		</>
	);
}
