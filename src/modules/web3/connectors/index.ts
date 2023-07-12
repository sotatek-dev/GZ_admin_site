import { metaMask, hooks as metaMaskHooks } from './metaMask';
import { walletConnect, hooks as walletConnectHooks } from './walletConnect';

export enum ConnectorKey {
	metaMask = 'MetaMask',
	walletConnect = 'WalletConnect',
}

export const connectors = {
	[ConnectorKey.metaMask]: metaMask,
	[ConnectorKey.walletConnect]: walletConnect,
};

export const hooks = {
	[ConnectorKey.metaMask]: metaMaskHooks,
	[ConnectorKey.walletConnect]: walletConnectHooks,
};
