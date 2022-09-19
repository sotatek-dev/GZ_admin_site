import './scss/Generalinfor.style.scss';
import { Input } from 'antd';

export default function SaleRoundGeneralInfor() {
	return (
		<>
			<div className='sr-block-contents'>
				<div className={'sale-round-title sr-generalinfor-title--h'}>
					Sale Round general info
				</div>
				<div className='px-20 sr-generalinfor-showip--h'>
					<div className='ip-sale-round-general-label'>Sale Round name *</div>
					<Input className='ip-sale-round-general' placeholder='Basic usage' />
				</div>
			</div>
		</>
	);
}
