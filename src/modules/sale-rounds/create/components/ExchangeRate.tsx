import { Input } from 'antd';

export default function SaleRoundExchangeRate() {
	return (
		<>
			<div className='box-sale-round'>
				<div
					style={{
						height: '48px',
					}}
					className={'sale-round-title'}
				>
					Exchange Rates
				</div>
				<div
					style={{
						height: '142px',
					}}
					className='pt-16 px-20 d-flex w-100'
				>
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
						<svg
							width='25'
							height='11'
							viewBox='0 0 25 11'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M0 4.68867V5.46992C0 6.11713 0.524658 6.64179 1.17188 6.64179H18.75V8.98554C18.75 10.0332 20.0174 10.5472 20.7505 9.81415L24.6568 5.90791C25.1144 5.45029 25.1144 4.7083 24.6568 4.25063L20.7505 0.344381C20.0146 -0.391507 18.75 0.129733 18.75 1.17304L18.75 3.51679H1.17188C0.524658 3.51679 0 4.04145 0 4.68867Z'
								fill='#050505'
							/>
						</svg>
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
