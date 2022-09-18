import { Input } from 'antd';

export default function SaleRoundList() {
	return (
		<>
			<div className='box-sale-round'>
				<div
					style={{
						height: '97.33px',
					}}
					className={'sale-round-title'}
				>
					Sale Round general info
				</div>
				<div
					style={{
						height: '244.67px',
					}}
					className='px-20'
				>
					<div className='ip-sale-round-general-label'>Sale Round name *</div>
					<Input className='ip-sale-round-general' placeholder='Basic usage' />
				</div>
			</div>
		</>
	);
}
