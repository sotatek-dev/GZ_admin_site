import { ConnectorKey, connectors } from '@web3/connectors';
import { CONNECTOR_KEY } from '@web3/constants/storages';
import { BSC_CHAIN_ID } from '@web3/constants/envs';
import { useActiveWeb3React } from './useActiveWeb3React';
import { message } from 'antd';
import { MESSAGES } from '@common/constants/messages';

/**
 * Hook for connect/disconnect to a wallet
 * @returns `connectWallet` and `disconnectWallet` functions .
 */
export const useConnectWallet = () => {
	const { connector } = useActiveWeb3React();

	async function connectWallet(connectorKey: ConnectorKey) {
		const connector = connectors[connectorKey];

		try {
			await connector.activate(Number(BSC_CHAIN_ID));
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
