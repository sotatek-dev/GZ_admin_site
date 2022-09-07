import './ConnectWallet.style.scss';
import { ConnectorKey } from '@web3/connectors';
import { useConnectWallet } from '@web3/hooks';
import { Col, Row, Space, Typography } from '@common/components';
import { Address, ConnectButton, Logo } from './components';

const { Title } = Typography;

export default function ConnectWallet() {
	const { connectWallet, isConnecting } = useConnectWallet();

	return (
		<div className='wallet'>
			<Logo />
			<Row className='wallet-main'>
				<Col span={14} offset={10}>
					<Title>Admin portal</Title>
					<Title level={3}>Connect wallet</Title>
					<Space direction='vertical' size={48}>
						<Address />
						<ConnectButton
							onClick={() => connectWallet(ConnectorKey.injected)}
							loading={isConnecting}
							type='primary'
						>
							Connect
						</ConnectButton>
					</Space>
				</Col>
			</Row>
		</div>
	);
}
