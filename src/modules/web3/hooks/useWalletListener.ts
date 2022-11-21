import { useEffect, useRef } from 'react';
import { useAuth } from '@common/hooks';
import { useActiveWeb3React } from './useActiveWeb3React';

/**
 * Use for network and injected - logs user in
 * and out after checking what network they're on
 */
export function useWalletListener() {
	const { error, activate, connector } = useActiveWeb3React();
	const { isAuth, signOut, admin } = useAuth();

	const prevAccount = useRef<string | undefined>();

	useEffect(() => {
		// Wallet connect emit account changed event at the first time user open Metamask mobile app
		// Compare account address before and after event was emitted
		if (connector && connector.on && !error && isAuth) {
			prevAccount.current = admin?.wallet_address;

			const updateFn = (...arg: [{ chainId?: string; account?: string }]) => {
				if (
					arg[0].account == undefined ||
					prevAccount.current !== arg[0].account
				) {
					signOut();
				}
			};

			connector.on('Web3ReactUpdate', updateFn);

			return () => {
				if (connector.removeListener) {
					connector.removeListener('Web3ReactUpdate', updateFn);
				}
			};
		}
	}, [error, activate, isAuth]);
}
