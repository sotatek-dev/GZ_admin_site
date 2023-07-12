import { initializeConnector } from '@web3-react/core';
import { WalletConnect } from '@web3-react/walletconnect-v2';

import { CHAINS } from '../chains';
import { BSC_RPC_URL, PROJECT_ID } from '../constants/envs';

const [mainnet] = Object.keys(CHAINS).map(Number);

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
	(actions) =>
		new WalletConnect({
			actions,
			options: {
				projectId: PROJECT_ID,
				chains: [mainnet],
				showQrModal: true,
				rpcMap: {
					97: BSC_RPC_URL,
				},
			},
		})
);
