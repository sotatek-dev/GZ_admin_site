import PreSalePoolABI from '@web3/abis/PresalePool.json';
import { PresalePool } from '../abis/types';
import { useContract } from './useContract';

export const usePresalePoolContract = (address: string): PresalePool | null => {
	return useContract<PresalePool>(PreSalePoolABI, address);
};
