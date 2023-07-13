import React, { useEffect, useState } from 'react';
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
import { CONNECTOR_KEY } from '@web3/constants/storages';
import { BSC_CHAIN_ID_HEX } from '@web3/constants/envs';

export const authContext = React.createContext<
	| {
			isAuthChecking: boolean;
			isAuth: boolean;
			signIn: (connector: ConnectorKey) => Promise<void>;
			signOut: VoidFunction;
			admin: Admin | undefined;
			connectorKey: ConnectorKey | undefined;
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
	const { isActive, connector, account } = useActiveWeb3React();
	const { disconnectWallet } = useConnectWallet();
	const { login } = useLogin();

	const isAuth = hasStorageJwtToken() && isActive;
	console.log({ isActive }, hasStorageJwtToken());

	const { data: admin, isLoading: isGetAdminProfile } = useGetProfile(isAuth);

	if (triedEagerConnect && !isActive && hasStorageJwtToken()) {
		removeStorageJwtToken();
	}

	const storedWallet =
		(window.localStorage.getItem(CONNECTOR_KEY) as ConnectorKey) ?? undefined;
	const [connectorKey, setConnectorKey] = useState<ConnectorKey>(storedWallet);

	async function signIn(connectorKey: ConnectorKey) {
		try {
			const connector = connectors[connectorKey];

			// Ignore signing message
			const isNotSignedIn = !hasStorageJwtToken() || isJwtTokenExpired();
			if (isNotSignedIn && connector.provider) {
				const signer = new Web3Provider(connector.provider).getSigner();
				const account = await signer.getAddress();
				const signMessage = getSignMessage(account);
				const signature = await trySignMessage(signer, signMessage);

				await login(account, signMessage, signature);
				setConnectorKey(connectorKey);
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

	useEffect(() => {
		if (!connector?.provider && !account) return;

		const onChangeAccount = ([accountConnected]: Array<string>) => {
			if (
				!accountConnected ||
				accountConnected?.toLowerCase() !== account?.toLowerCase()
			) {
				disconnectWallet();
			}
		};

		const onChangeNetwork = (chainId: string | number) => {
			if (chainId !== BSC_CHAIN_ID_HEX) return signOut();
		};

		if (connector?.provider && connector.provider?.on) {
			connector.provider &&
				connector.provider?.on('accountsChanged', onChangeAccount);
			connector.provider &&
				connector.provider?.on('chainChanged', onChangeNetwork);
		}
		return () => {
			connector?.provider?.removeListener('accountsChanged', onChangeAccount); // need func reference to remove correctly
			connector?.provider?.removeListener('chainChanged', onChangeNetwork); // need func reference to remove correctly
		};
	}, [account, connector]);

	return (
		<authContext.Provider
			value={{
				isAuthChecking: !triedEagerConnect || isGetAdminProfile,
				isAuth,
				signIn,
				signOut,
				admin,
				connectorKey,
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
