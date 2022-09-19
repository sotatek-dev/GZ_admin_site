import './scss/TokenInfor.style.scss';
import { Input } from 'antd';

export default function SaleRoundTokenInfor() {
	return (
		<>
			<div className='sr-block-contents'>
				<div className={'sale-round-title sr-tokeninfor-title--h'}>
					Token Info
				</div>
				<div className='px-20 sr-tokeninfor-showip--h'>
					<div className='pt-11'>
						<div className='ip-sale-round-general-label'>
							Sale Round name <span className='ip-requirement'>*</span>
						</div>
						<Input className='ip-sr-token-infor' placeholder='Basic usage' />
					</div>
					<div className='pt-22'>
						<div className='ip-sale-round-general-label'>Token Symbol</div>
						<Input className='ip-sr-token-infor' placeholder='Basic usage' />
					</div>
					<div className='pt-22'>
						<div className='ip-sale-round-general-label'>
							Address (Recieve Money)
						</div>
						<Input className='ip-sr-token-infor' placeholder='Basic usage' />
					</div>
					<div className='pt-22'>
						<div className='ip-sale-round-general-label'>
							Total Sold Coin <span className='ip-requirement'>*</span>
						</div>
						<Input className='ip-sr-token-infor' placeholder='Basic usage' />
					</div>
					<div className='pt-22'>
						<div className='ip-sale-round-general-label'>Token Icon</div>
						<Input className='ip-sr-token-infor' placeholder='Basic usage' />
					</div>
				</div>
			</div>
		</>
	);
}
