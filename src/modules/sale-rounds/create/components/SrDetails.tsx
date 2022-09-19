import './scss/SrDetails.style.scss';
import aboutIcon from './icons/about-icon.svg';
import { Tooltip } from 'antd';
import { Input } from 'antd';
import { Radio } from 'antd';

export default function SaleRoundBoxDetails() {
	return (
		<>
			<div className='sr-block-contents'>
				<div className={'sale-round-title sr-showdetail-title--h'}>
					Sale Round details
				</div>
				<div className='px-20 sale-round-contents sr-showdetail-showip--h'>
					<div className={'sr-detail-box-radio'}>
						<div className='SR-contents-title'>Network available</div>
						<Radio.Group name='radiogroup' defaultValue={1}>
							<Radio value={1}>A</Radio>
							<Radio value={2}>B</Radio>
							<Radio value={3}>C</Radio>
							<Radio value={4}>D</Radio>
						</Radio.Group>
					</div>
					<div>
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
					</div>
				</div>
			</div>
		</>
	);
}
