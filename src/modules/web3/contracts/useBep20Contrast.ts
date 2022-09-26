import { Bep20 } from '../abis/types';
import BEP20ABI from '@web3/abis/bep20.json';
import { useContract } from './useContract';

export const useBep20Contract = (address: string): Bep20 | null => {
	return useContract<Bep20>(BEP20ABI, address);
};
