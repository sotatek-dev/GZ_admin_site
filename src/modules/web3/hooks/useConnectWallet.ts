import { UnsupportedChainIdError } from '@web3-react/core';
import { UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector';
import { toast } from 'react-toastify';
import { useActiveWeb3React } from '@web3/hooks/useActiveWeb3React';
import { activateInjectedProvider } from '../helpers/activateInjectedProvider';
import { ConnectorKey, connectors } from '@web3/connectors';
import { CONNECTOR_KEY } from '@web3/constants/storages';

/**
 * Hook for connect/disconnect to a wallet
 * @returns `connectWallet` and `disconnectWallet` functions .
 */
export const useConnectWallet = () => {
	const { activate, deactivate } = useActiveWeb3React();

	async function connectWallet(connectorKey: ConnectorKey) {
		const connector = connectors[connectorKey];

		try {
			activateInjectedProvider(connectorKey);

			await activate(connector, undefined, true);
			setStorageWallet(connectorKey);
		} catch (error) {
			if (
				error instanceof UserRejectedRequestErrorInjected ||
				(error instanceof Error &&
					error.message === 'User denied account authorization') // Coinbase wallet
			) {
				toast.error('');
			}

			if (error instanceof UnsupportedChainIdError) {
				// const provider = await connector.getProvider();
				toast.error('');
				// const hasSetup = await setupNetwork(library?.provider);
				// if (hasSetup) {
				//   await activate(connector);
				//   throw error;
				// }
			}

			throw error;
		}
	}

	function disconnectWallet() {
		removeStorageWallet();
		deactivate();
	}

	return { connectWallet, disconnectWallet };
};

function setStorageWallet(connector: ConnectorKey) {
	localStorage.setItem(CONNECTOR_KEY, connector);
}

function removeStorageWallet() {
	window.localStorage.removeItem(CONNECTOR_KEY);
}
