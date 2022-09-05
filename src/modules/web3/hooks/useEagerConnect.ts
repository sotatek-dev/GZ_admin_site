import { useEffect, useState } from 'react';
import { useActiveWeb3React } from './useActiveWeb3React';
import { ConnectorKey, connectors } from '../connectors';
import { CONNECTOR_KEY } from '../constants/storages';
import { useConnectWallet } from './useConnectWallet';
import { activateInjectedProvider } from '../helpers/activateInjectedProvider';

/**
 * Trying eager connect to connectors at first time.
 * @returns `tried` tried eager connect done or not
 */
export function useEagerConnect() {
	const { active } = useActiveWeb3React();
	const { connectWallet } = useConnectWallet();
	const [tried, setTried] = useState(false);
	const wallet = window.localStorage.getItem(CONNECTOR_KEY);

	useEffect(() => {
		if (!active) {
			// Ensure that `isAuthorize` function below return true if wallet is injected
			// https://github.com/NoahZinsmeister/web3-react/blob/17882f0e4279a8fa425f79b96a1536bbf292e1db/packages/injected-connector/src/index.ts#L196
			activateInjectedProvider(wallet as ConnectorKey);

			connectors[ConnectorKey.injected]
				.isAuthorized()
				.then((isAuthorized) => {
					if (
						isAuthorized &&
						Object.values(ConnectorKey).includes(wallet as ConnectorKey)
					) {
						return connectWallet(wallet as ConnectorKey);
					}
				})
				.finally(() => {
					setTried(true);
				});

			return;
		}

		// Update `tried` only when active was `true`
		setTried(true);
	}, [active]);

	return tried;
}
