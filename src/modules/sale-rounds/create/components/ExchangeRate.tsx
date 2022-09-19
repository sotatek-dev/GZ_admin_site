import './scss/ExchangeRate.style.scss';
import arrowLeft from './icons/arrow-left-icon.svg';
import { Input } from 'antd';

export default function SaleRoundExchangeRate() {
	return (
		<>
			<div className='sr-block-contents'>
				<div className={'sale-round-title sr-exchangerate-title--h'}>
					Exchange Rates
				</div>
				<div className='pt-16 px-20 d-flex w-100 sr-exchangerate-showip--h'>
					<div className='w-45'>
						<div className='ip-sale-round-general-label'>
							You have <span className='ip-requirement'>*</span>
						</div>
						<Input
							className='ip-sr-exchange-rate'
							suffix='BUSD'
							defaultValue='mysite'
						/>
					</div>
					<div className='pt-31 icon-arrow-exchange'>
						<img src={arrowLeft} alt='' />
					</div>
					<div className='w-45'>
						<div className='ip-sale-round-general-label'>You get</div>
						<Input
							className='ip-sr-exchange-rate'
							addonAfter='GXZ'
							defaultValue='mysite'
						/>
					</div>
				</div>
			</div>
		</>
	);
}
