import React from 'react';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
// import { MESSAGES } from '@common/constants/messages';
// import { PATHS } from '@common/constants/paths';
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
import { useQueryClient } from 'react-query';

export const authContext = React.createContext<
	| {
			isAuthChecking: boolean;
			isAuth: boolean;
			signIn: (connector: ConnectorKey) => Promise<void>;
			signOut: VoidFunction;
	  }
	| undefined
>(undefined);

// interface LocationState {
// 	returnUrl: string;
// }

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = useQueryClient();
	// let navigate = useNavigate();
	const location = useLocation();
	const triedEagerConnect = useEagerConnect();
	const { active } = useActiveWeb3React();
	const { connectWallet, disconnectWallet } = useConnectWallet();
	// const { loginAsync } = useLoginMutation();

	const isAuth = hasStorageJwtToken() && active;
	if (triedEagerConnect && !active && hasStorageJwtToken()) {
		removeStorageJwtToken();
	}

	async function signIn(connectorKey: ConnectorKey) {
		const connector = connectors[connectorKey];
		await connectWallet(connectorKey);

		// Ignore signing message
		const isNotSignedIn = !hasStorageJwtToken() || isJwtTokenExpired();
		if (isNotSignedIn) {
			const provider = await connector.getProvider();
			const signer = new Web3Provider(provider).getSigner();
			const account = await signer.getAddress();
			const message = `${process.env.REACT_APP_AUTH_MESSAGE_SIGN} ${account}`;
			await signMessage(signer, message);
			// await loginAsync(account, message, signature);
		}

		if (location.state) {
			// const { returnUrl } = location.state as LocationState;
			// navigate(returnUrl);
			return;
		}
		// navigate(PATHS.enterEmail());
	}

	function signOut() {
		removeStorageJwtToken();
		disconnectWallet();
		queryClient.clear();
		// navigate(PATHS.connectWallet());
	}

	return (
		<authContext.Provider
			value={{ isAuthChecking: !triedEagerConnect, isAuth, signIn, signOut }}
		>
			{children}
		</authContext.Provider>
	);
};

async function signMessage(signer: JsonRpcSigner, message: string) {
	try {
		const signature = await signer.signMessage(message);
		return signature;
	} catch (error) {
		toast.error('');
		throw error;
	}
}
