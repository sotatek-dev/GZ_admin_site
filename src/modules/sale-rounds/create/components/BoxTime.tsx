import { DatePicker } from 'antd';

export default function SaleRoundBoxTime() {
	return (
		<>
			<div className='box-sale-round'>
				<div
					style={{
						height: '53px',
					}}
					className={'sale-round-title'}
				>
					Start/End Buy Time
				</div>
				<div
					style={{
						height: '137px',
					}}
					className='pt-16 px-20 d-flex w-100'
				>
					<div className='w-100 pr-20'>
						<div className='ip-sale-round-general-label'>Start Buy Time</div>
						<DatePicker
							className={'ip-box-datetime'}
							renderExtraFooter={() => 'extra footer'}
							showTime
						/>
					</div>
					<div className='w-100 pl-20'>
						<div className='ip-sale-round-general-label'>End Buy Time</div>
						<DatePicker
							className={'ip-box-datetime'}
							renderExtraFooter={() => 'extra footer'}
							showTime
						/>
					</div>
				</div>
			</div>
		</>
	);
}
