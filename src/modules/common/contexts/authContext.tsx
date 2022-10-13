import React from 'react';
import { useQueryClient } from 'react-query';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
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
import { Admin } from '@admins/common/types';
import { useGetProfile } from '@common/services/queries/useGetProfile';

export const authContext = React.createContext<
	| {
			isAuthChecking: boolean;
			isAuth: boolean;
			signIn: (connector: ConnectorKey) => Promise<void>;
			signOut: VoidFunction;
			admin: Admin | undefined;
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
	const { data: admin } = useGetProfile(isAuth);

	if (triedEagerConnect && !active && hasStorageJwtToken()) {
		removeStorageJwtToken();
	}

	async function signIn(connectorKey: ConnectorKey) {
		try {
			const connector = connectors[connectorKey];

			// Ignore signing message
			const isNotSignedIn = !hasStorageJwtToken() || isJwtTokenExpired();
			if (isNotSignedIn) {
				const provider = await connector.getProvider();
				const signer = new Web3Provider(provider).getSigner();
				const account = await signer.getAddress();
				const signMessage = getSignMessage(account);
				const signature = await trySignMessage(signer, signMessage);

				await login(account, signMessage, signature);
			}

			if (location.state) {
				const { returnUrl } = location.state as LocationState;
				navigate(returnUrl);
				return;
			}

			navigate(PATHS.saleRounds.list());
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	}

	function signOut() {
		disconnectWallet();
		removeStorageJwtToken();
		queryClient.clear();
		navigate(PATHS.connectWallet());
	}

	return (
		<authContext.Provider
			value={{
				isAuthChecking: !triedEagerConnect,
				isAuth,
				signIn,
				signOut,
				admin,
			}}
		>
			{children}
		</authContext.Provider>
	);
};

const trySignMessage = async (signer: JsonRpcSigner, signature: string) => {
	return await signer.signMessage(signature);
};

const getSignMessage = (account: string) =>
	process.env.REACT_APP_SIGN_MESSAGE + account;
