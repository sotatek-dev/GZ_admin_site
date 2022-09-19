import { useEffect } from 'react';
import { useActiveWeb3React } from './useActiveWeb3React';

/**
 * Use for network and injected - logs user in
 * and out after checking what network they're on
 */
export function useWalletListener() {
	const { error, activate, connector } = useActiveWeb3React();

	useEffect(() => {
		const { ethereum } = window;

		if (connector && connector.on && !error) {
			const update = () => {};
			connector.on('Web3ReactUpdate', update);

			return () => {
				if (ethereum.removeListener) {
					connector.removeListener('Web3ReactUpdate', update);
				}
			};
		}
	}, [error, activate]);
}
