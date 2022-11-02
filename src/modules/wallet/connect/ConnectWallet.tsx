import './ConnectWallet.style.scss';
import { useState } from 'react';
import { ConnectorKey } from '@web3/connectors';
import { useActiveWeb3React, useConnectWallet } from '@web3/hooks';
import { Col, message, Row, Space, Typography } from '@common/components';
import { useAuth } from '@common/hooks/useAuth';
import { useConnectedRedirect } from './ConnectWallet.hooks';
import { Address, ConnectButton, Logo } from './components';
import { MESSAGES } from '@common/constants/messages';
import WalletOption from './components/WalletOption';
import { MetaMaskIcon, WalletConnect } from 'src/assets/icons';
import WalletOptionList from './components/WalletOptionList';
import { CONNECTOR_KEY } from '@web3/constants/storages';

const { Title } = Typography;

export default function ConnectWallet() {
	useConnectedRedirect();

	const { active } = useActiveWeb3React();
	const { connectWallet, disconnectWallet } = useConnectWallet();
	const { signIn } = useAuth();

	const storedWallet =
		window.localStorage.getItem(CONNECTOR_KEY) ??
		(undefined as ConnectorKey | undefined);
	const [isSignIn, setIsSignIn] = useState(false);
	const [wallet2Connect, setWallet2Connect] = useState<ConnectorKey>(
		storedWallet as ConnectorKey
	);

	async function handleConnect() {
		if (!wallet2Connect) return;
		const isMetamaskInstalled = window?.ethereum?.isMetaMask;

		try {
			setIsSignIn(true);

			if (!isMetamaskInstalled) {
				setIsSignIn(false);
				message.error({ content: MESSAGES.MC3, key: MESSAGES.MC3 });
				return;
			}
			if (!active) {
				await connectWallet(wallet2Connect);
				return;
			}

			await signIn(wallet2Connect);
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
					<Space direction='vertical' size={40}>
						<WalletOptionList
							value={wallet2Connect}
							onChange={(e) => {
								disconnectWallet();
								setWallet2Connect(e.target.value);
							}}
						>
							<WalletOption value={ConnectorKey.injected}>
								<img src={MetaMaskIcon} alt='' width={36} height={36} />
								<div style={{ lineHeight: '1rem' }}>Metamask</div>
							</WalletOption>
							<WalletOption value={ConnectorKey.walletConnect}>
								<img src={WalletConnect} alt='' width={36} height={36} />
								<div style={{ lineHeight: '1rem' }}>Wallet Connect</div>
							</WalletOption>
						</WalletOptionList>
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
