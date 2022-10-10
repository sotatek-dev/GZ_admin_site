import { useAuth } from '@common/hooks';
import { useEffect } from 'react';
import { useActiveWeb3React } from './useActiveWeb3React';

/**
 * Use for network and injected - logs user in
 * and out after checking what network they're on
 */
export function useWalletListener() {
	const { error, activate, connector } = useActiveWeb3React();
	const { signOut } = useAuth();

	useEffect(() => {
		const { ethereum } = window;

		if (connector && connector.on && !error) {
			connector.on('Web3ReactUpdate', signOut);

			return () => {
				if (ethereum.removeListener) {
					connector.removeListener('Web3ReactUpdate', signOut);
				}
			};
		}
	}, [error, activate]);
}
