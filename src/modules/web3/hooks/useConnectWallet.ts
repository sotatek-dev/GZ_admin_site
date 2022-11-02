import { UnsupportedChainIdError } from '@web3-react/core';
import { UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector';
import {
	UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
	WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
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
			if (
				error instanceof UserRejectedRequestErrorInjected ||
				error instanceof UserRejectedRequestErrorWalletConnect
			) {
				if (connector instanceof WalletConnectConnector) {
					const walletConnector = connector;
					walletConnector.walletConnectProvider = undefined;
				}
			}

			if (error instanceof UnsupportedChainIdError) {
				message.error({ content: MESSAGES.MC2, key: MESSAGES.MC2 });

				// https://github.com/MetaMask/metamask-mobile/issues/3090
				if (connectorKey === ConnectorKey.walletConnect) {
					return;
				}

				const provider = await connector.getProvider();
				const hasSetup = await setupNetwork(provider.provider);
				if (hasSetup) {
					await activate(connector);
					return;
				}
			}
		}
	}

	function disconnectWallet() {
		removeStorageWallet();
		removeWalletConnectData();
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

function removeWalletConnectData() {
	if (window.localStorage.getItem('walletconnect')) {
		connectors.WalletConnect.close();
		connectors.WalletConnect.walletConnectProvider = undefined;

		window.localStorage.removeItem('walletconnect');
	}
}
