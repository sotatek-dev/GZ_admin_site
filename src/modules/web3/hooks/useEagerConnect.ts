import { useEffect, useState } from 'react';
import { useActiveWeb3React } from './useActiveWeb3React';
import { ConnectorKey } from '../connectors';
import { CONNECTOR_KEY } from '../constants/storages';
import { metaMask } from '@web3/connectors/metaMask';
import { walletConnect } from '@web3/connectors/walletConnect';

/**
 * Trying eager connect to connectors at first time.
 * @returns `tried` tried eager connect done or not
 */
export function useEagerConnect() {
	const { isActive } = useActiveWeb3React();
	const [tried, setTried] = useState(false);
	const wallet = window.localStorage.getItem(CONNECTOR_KEY);

	useEffect(() => {
		if (!isActive) {
			if (wallet === ConnectorKey.walletConnect) {
				walletConnect.connectEagerly().catch((error) => {
					console.error('Failed to connect eagerly to walletconnect', error);
				});
			} else if (wallet === ConnectorKey.metaMask) {
				metaMask.connectEagerly().catch((error) => {
					console.error('Failed to connect eagerly to walletconnect', error);
				});
			}
			return;
		}

		// Update `tried` only when isActive was `true`
		setTried(true);
	}, [isActive]);

	return tried;
}
