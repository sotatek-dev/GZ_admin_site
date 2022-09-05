import { ConnectorKey } from '@web3/connectors';

/**
 * Injected connector activation opening both Metamask and Coinbase wallet popups
 * https://github.com/NoahZinsmeister/web3-react/issues/300
 * @param providerName provider you want to activate
 * @returns void
 */
export function activateInjectedProvider(providerName: ConnectorKey) {
	const { ethereum } = window;

	if (!ethereum?.providers) return;

	let provider;
	switch (providerName) {
		case ConnectorKey.injected:
			provider = ethereum.providers.find(
				({ isMetaMask }: { isMetaMask: boolean }) => isMetaMask
			);
			break;
	}

	if (provider) {
		ethereum.setSelectedProvider(provider);
	}
}
