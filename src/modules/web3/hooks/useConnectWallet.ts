import { UnsupportedChainIdError } from '@web3-react/core';
import { useActiveWeb3React } from '@web3/hooks/useActiveWeb3React';
import { ConnectorKey, connectors } from '@web3/connectors';
import { CONNECTOR_KEY } from '@web3/constants/storages';
import { MESSAGES } from '@common/constants/messages';
import { message } from '@common/components';
import { activateInjectedProvider } from '../helpers/activateInjectedProvider';
import { setupNetwork } from '@web3/helpers/setupNetwork';

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
			if (error instanceof UnsupportedChainIdError) {
				message.error({ content: MESSAGES.MC2, key: MESSAGES.MC2 });
				const provider = await connector.getProvider();

				const hasSetup = await setupNetwork(provider);
				if (hasSetup) {
					await activate(connector);
					return;
				}
			}
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
