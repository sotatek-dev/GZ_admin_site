import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

/**
 * Use this hook instead useWeb3React
 * @returns `web3-react` context with ethers Provider types
 */
export const useActiveWeb3React = () => {
	return useWeb3React<Web3Provider>();
};
