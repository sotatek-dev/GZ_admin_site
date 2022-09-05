import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';

/**
 * Use this hook instead useWeb3React
 * @returns `web3-react` context with ethers Provider types
 */
export const useActiveWeb3React =
	(): Web3ReactContextInterface<Web3Provider> => {
		return useWeb3React<Web3Provider>();
	};
