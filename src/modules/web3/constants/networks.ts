import { Newtwork } from '../types';
import {
	ETH_BLOCK_EXPLORER_URL,
	ETH_CHAIN_ID,
	ETH_CHAIN_ID_HEX,
	ETH_RPC_URL,
	REACT_APP_ETH_NAME,
} from './envs';

export const SUPPORTED_NETWORKS: { [key: string]: Newtwork } = {
	[ETH_CHAIN_ID]: {
		chainId: Number(ETH_CHAIN_ID),
		chainIdHex: ETH_CHAIN_ID_HEX,
		chainName: REACT_APP_ETH_NAME,
		nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
		blockExplorerUrls: [ETH_BLOCK_EXPLORER_URL],
		rpcUrls: [ETH_RPC_URL],
	},
};
