import { Radio } from '@common/components';
import type { RadioGroupProps } from 'antd';

export default function WalletOptionList(props: RadioGroupProps) {
	return (
		<Radio.Group
			buttonStyle='outline'
			size='large'
			style={{ display: 'flex', gap: '1rem' }}
			{...props}
		/>
	);
}
