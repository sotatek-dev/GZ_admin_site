import { Tooltip } from 'antd';
import { Input } from 'antd';
import { Radio } from 'antd';

export default function SaleRoundBoxDetails() {
	return (
		<>
			<div className='box-sale-round'>
				<div
					style={{
						height: '60px',
					}}
					className={'sale-round-title'}
				>
					Sale Round details
				</div>
				<div
					style={{
						height: '283px',
					}}
					className='px-20 sale-round-contents'
				>
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
									<svg
										width='16'
										height='16'
										viewBox='0 0 16 16'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M8 0.125C3.65117 0.125 0.125 3.65117 0.125 8C0.125 12.3488 3.65117 15.875 8 15.875C12.3488 15.875 15.875 12.3488 15.875 8C15.875 3.65117 12.3488 0.125 8 0.125ZM7.4375 4.20312C7.4375 4.12578 7.50078 4.0625 7.57812 4.0625H8.42188C8.49922 4.0625 8.5625 4.12578 8.5625 4.20312V8.98438C8.5625 9.06172 8.49922 9.125 8.42188 9.125H7.57812C7.50078 9.125 7.4375 9.06172 7.4375 8.98438V4.20312ZM8 11.9375C7.77921 11.933 7.56898 11.8421 7.41442 11.6844C7.25986 11.5266 7.1733 11.3146 7.1733 11.0938C7.1733 10.8729 7.25986 10.6609 7.41442 10.5031C7.56898 10.3454 7.77921 10.2545 8 10.25C8.22079 10.2545 8.43103 10.3454 8.58558 10.5031C8.74014 10.6609 8.8267 10.8729 8.8267 11.0938C8.8267 11.3146 8.74014 11.5266 8.58558 11.6844C8.43103 11.8421 8.22079 11.933 8 11.9375Z'
											fill='#002E58'
										/>
									</svg>
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
