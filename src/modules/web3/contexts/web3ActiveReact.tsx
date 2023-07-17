import React from 'react';
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect-v2';
import { hooks as metaMaskHooks, metaMask } from '../connectors/metaMask';
import {
	hooks as walletConnectHooks,
	walletConnect,
} from '../connectors/walletConnect';
type Props = {
	children: React.ReactNode;
};

const connectors: [MetaMask | WalletConnect, Web3ReactHooks][] = [
	[metaMask, metaMaskHooks],
	[walletConnect, walletConnectHooks],
];

export const Web3ActiveReactProvider: React.FC<Props> = ({ children }) => {
	return (
		<Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
	);
};
