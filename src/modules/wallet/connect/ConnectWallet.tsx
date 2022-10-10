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
		const isMetamaskInstalled = window?.ethereum?.isMetaMask;

		try {
			setIsSignIn(true);

			if (!isMetamaskInstalled) {
				setIsSignIn(false);
				message.error({ content: MESSAGES.MC3, key: MESSAGES.MC3 });
				return;
			}

			if (!active) {
				await connectWallet(ConnectorKey.injected);
				return;
			}

			await signIn(ConnectorKey.injected);
		} finally {
			setIsSignIn(false);
		}
	}

	const buttonLabel = active ? 'Sign In' : 'Connect';

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
							{buttonLabel}
						</ConnectButton>
					</Space>
				</Col>
			</Row>
		</div>
	);
}
