import { Input } from 'antd';

const { TextArea } = Input;

export default function AboutSaleRaound() {
	return (
		<>
			<div className='box-sale-round'>
				<div
					style={{
						height: '70px',
					}}
					className={'sale-round-title'}
				>
					About the Sale Round
				</div>
				<div
					style={{
						height: '365px',
					}}
					className='px-20'
				>
					<div className='ip-sale-round-general-label'>Sale Round name *</div>
					<TextArea className='about-sr-textarea' rows={13} />
				</div>
			</div>
		</>
	);
}
