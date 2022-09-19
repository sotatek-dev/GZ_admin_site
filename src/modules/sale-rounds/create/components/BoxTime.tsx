import './scss/BoxTime.style.scss';
import { DatePicker } from 'antd';

export default function SaleRoundBoxTime() {
	return (
		<>
			<div className='sr-block-contents'>
				<div className={'sale-round-title sr-datetime-title--h'}>
					Start/End Buy Time
				</div>
				<div className='pt-16 px-20 d-flex w-100 sr-datetime-showip--h'>
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
