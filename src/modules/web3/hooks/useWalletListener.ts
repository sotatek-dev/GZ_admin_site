import { useAuth } from '@common/hooks';
import { useEffect } from 'react';
import { useActiveWeb3React } from './useActiveWeb3React';

/**
 * Use for network and injected - logs user in
 * and out after checking what network they're on
 */
export function useWalletListener() {
	const { error, activate, connector } = useActiveWeb3React();
	const { isAuth, signOut } = useAuth();

	useEffect(() => {
		const { ethereum } = window;

		if (connector && connector.on && !error) {
			const updateFn = () => {
				// eslint-disable-next-line no-console
				console.warn('Logout because of web3 react updating');

				if (isAuth) {
					signOut();
				}
			};

			connector.on('Web3ReactUpdate', updateFn);

			return () => {
				if (ethereum.removeListener) {
					connector.removeListener('Web3ReactUpdate', updateFn);
				}
			};
		}
	}, [error, activate, isAuth]);
}
