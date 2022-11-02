import './WalletOption.style.scss';
import { Radio } from '@common/components';
import type { RadioProps } from 'antd';

export default function WalletOption({ children, ...props }: RadioProps) {
	return (
		<Radio.Button className='wallet-radio-btn' {...props}>
			<div className='wallet-radio-btn-content'>{children}</div>
		</Radio.Button>
	);
}
