import { Newtwork } from '../types';
import {
	BSC_CHAIN_ID,
	BSC_CHAIN_ID_HEX,
	BSC_BLOCK_EXPLORER_URL,
	BSC_RPC_URL,
	BSC_NAME,
} from './envs';

export const SUPPORTED_NETWORKS: { [key: string]: Newtwork } = {
	[BSC_CHAIN_ID]: {
		chainId: Number(BSC_CHAIN_ID),
		chainIdHex: BSC_CHAIN_ID_HEX,
		chainName: BSC_NAME,
		nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
		blockExplorerUrls: [BSC_BLOCK_EXPLORER_URL],
		rpcUrls: [BSC_RPC_URL],
	},
};
