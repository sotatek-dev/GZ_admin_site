import './scss/AboutSaleRaound.style.scss';
import { Input } from 'antd';

const { TextArea } = Input;

export default function AboutSaleRound() {
	return (
		<>
			<div className='sr-block-contents'>
				<div className={'sale-round-title sr-about-title--h'}>
					About the Sale Round
				</div>
				<div className='px-20 sr-about-show-ip--h'>
					<div className='ip-sale-round-general-label'>Sale Round name *</div>
					<TextArea className='about-sr-textarea' rows={13} />
				</div>
			</div>
		</>
	);
}
