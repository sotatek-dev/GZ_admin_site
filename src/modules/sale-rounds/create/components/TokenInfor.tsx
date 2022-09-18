import { Input } from 'antd';

export default function SaleRoundTokenInfor() {
	return (
		<>
			<div className='box-sale-round'>
				<div
					style={{
						height: '49px',
					}}
					className={'sale-round-title'}
				>
					Token Info
				</div>
				<div
					style={{
						height: '521px',
					}}
					className='px-20'
				>
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
