import { Space, Typography } from '@common/components';
import { useActiveWeb3React } from '@web3/hooks';

const { Text } = Typography;

export default function Address() {
	const { account } = useActiveWeb3React();

	return account ? (
		<Space direction='vertical'>
			<Text>Address</Text>
			<Text className='wallet-text_address'>{account}</Text>
		</Space>
	) : null;
}
