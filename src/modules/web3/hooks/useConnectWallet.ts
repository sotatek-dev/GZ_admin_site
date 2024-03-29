import { WalletConnect } from '@web3-react/walletconnect-v2';
import { ConnectorKey, connectors } from '@web3/connectors';
import { CONNECTOR_KEY } from '@web3/constants/storages';
import { useActiveWeb3React } from './useActiveWeb3React';
import { message } from 'antd';
import { MESSAGES } from '@common/constants/messages';
import { AddEthereumChainParameter } from '@web3-react/types';
import {
	BSC_BLOCK_EXPLORER_URL,
	BSC_CHAIN_ID,
	BSC_NAME,
	BSC_RPC_URL,
} from '@web3/constants/envs';

/**
 * Hook for connect/disconnect to a wallet
 * @returns `connectWallet` and `disconnectWallet` functions .
 */
export const useConnectWallet = () => {
	const { connector } = useActiveWeb3React();

	async function connectWallet(connectorKey: ConnectorKey) {
		const connector = connectors[connectorKey];
		const chainInfo: AddEthereumChainParameter = {
			chainId: Number(BSC_CHAIN_ID),
			chainName: BSC_NAME,
			nativeCurrency: {
				name: 'BNB',
				symbol: 'BNB',
				decimals: 18,
			},
			rpcUrls: [BSC_RPC_URL],
			blockExplorerUrls: [BSC_BLOCK_EXPLORER_URL],
		};
		try {
			if (connector instanceof WalletConnect) {
				await connector.activate(chainInfo.chainId);
			} else {
				await connector.activate({ ...chainInfo });
			}
			setStorageWallet(connectorKey);
		} catch (error: any) {
			if ((error as { code: number }).code === 4001) {
				message.error(MESSAGES.MC1);
			}

			if (error && error.message.includes('user rejected signing')) {
				message.info('User rejected to sign');
			}
		}
	}

	function disconnectWallet() {
		connector.deactivate ? connector.deactivate() : connector.resetState();
		removeStorageWallet();
		removeWalletConnectData();
	}

	return { connectWallet, disconnectWallet };
};

function setStorageWallet(connector: ConnectorKey) {
	localStorage.setItem(CONNECTOR_KEY, connector);
}

function removeStorageWallet() {
	window.localStorage.removeItem(CONNECTOR_KEY);
}

function removeWalletConnectData() {
	if (window.localStorage.getItem('walletconnect')) {
		window.localStorage.removeItem('walletconnect');
	}
}
