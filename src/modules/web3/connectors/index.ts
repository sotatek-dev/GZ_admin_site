import { Injected } from './injected';
import { WalletConnect } from './walletConnect';

export enum ConnectorKey {
	injected = 'MetaMask',
	walletConnect = 'WalletConnect',
}

export const connectors = {
	[ConnectorKey.injected]: Injected,
	[ConnectorKey.walletConnect]: WalletConnect,
};
