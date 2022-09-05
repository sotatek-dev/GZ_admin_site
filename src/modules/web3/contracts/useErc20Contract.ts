import { Erc20 } from '../abis/types';
import Erc20ABI from '@web3/abis/erc20.json';
import { useContract } from './useContract';

export const useErc20Contract = (address: string): Erc20 | null => {
	return useContract<Erc20>(Erc20ABI, address);
};
