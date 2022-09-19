import './ConnectWallet.style.scss';
import { useState } from 'react';
import { ConnectorKey } from '@web3/connectors';
import { useActiveWeb3React, useConnectWallet } from '@web3/hooks';
import { Col, message, Row, Space, Typography } from '@common/components';
import { useAuth } from '@common/hooks/useAuth';
import { useConnectedRedirect } from './ConnectWallet.hooks';
import { Address, ConnectButton, Logo } from './components';
import { MESSAGES } from '@common/constants/messages';

const { Title } = Typography;

export default function ConnectWallet() {
	useConnectedRedirect();

	const { active } = useActiveWeb3React();
	const { connectWallet } = useConnectWallet();
	const { signIn } = useAuth();

	const [isSignIn, setIsSignIn] = useState(false);

	async function handleConnect() {
		try {
			setIsSignIn(true);
			if (!active) {
				await connectWallet(ConnectorKey.injected);
				return;
			}
			await signIn(ConnectorKey.injected);
			message.success(MESSAGES.MC3);
		} catch {
			message.error({ content: MESSAGES.MC4, key: MESSAGES.MC4 });
		} finally {
			setIsSignIn(false);
		}
	}

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
							onClick={handleConnect}
							loading={isSignIn}
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
