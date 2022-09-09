import React from 'react';
import { useQueryClient } from 'react-query';
import { Web3Provider } from '@ethersproject/providers';
import { useLocation, useNavigate } from 'react-router';
import { PATHS } from '@common/constants/paths';
import {
	hasStorageJwtToken,
	isJwtTokenExpired,
	removeStorageJwtToken,
} from '@common/helpers/jwt';
import { ConnectorKey, connectors } from '@web3/connectors';
import {
	useActiveWeb3React,
	useEagerConnect,
	useConnectWallet,
} from '@web3/hooks';
import { useLogin } from '@common/services/mutations';

export const authContext = React.createContext<
	| {
			isAuthChecking: boolean;
			isAuth: boolean;
			signIn: (connector: ConnectorKey) => Promise<void>;
			signOut: VoidFunction;
	  }
	| undefined
>(undefined);

interface LocationState {
	returnUrl: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();
	const triedEagerConnect = useEagerConnect();
	const { active } = useActiveWeb3React();
	const { disconnectWallet } = useConnectWallet();
	const { login } = useLogin();

	const isAuth = hasStorageJwtToken() && active;
	if (triedEagerConnect && !active && hasStorageJwtToken()) {
		removeStorageJwtToken();
	}

	async function signIn(connectorKey: ConnectorKey) {
		const connector = connectors[connectorKey];

		// Ignore signing message
		const isNotSignedIn = !hasStorageJwtToken() || isJwtTokenExpired();
		if (isNotSignedIn) {
			const provider = await connector.getProvider();
			const signer = new Web3Provider(provider).getSigner();
			const account = await signer.getAddress();
			const message = 'sign message';
			const signature = await signer.signMessage(message);
			await login(account, message, signature);
		}

		if (location.state) {
			const { returnUrl } = location.state as LocationState;
			navigate(returnUrl);
			return;
		}

		navigate(PATHS.admins.list());
	}

	function signOut() {
		removeStorageJwtToken();
		disconnectWallet();
		queryClient.clear();
		navigate(PATHS.connectWallet());
	}

	return (
		<authContext.Provider
			value={{ isAuthChecking: !triedEagerConnect, isAuth, signIn, signOut }}
		>
			{children}
		</authContext.Provider>
	);
};
