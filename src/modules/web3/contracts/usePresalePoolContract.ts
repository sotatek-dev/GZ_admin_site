import PreSalePoolABI from '@web3/abis/PresalePool.json';
import { PresalePool } from '../abis/types';
import { useContract } from './useContract';

export const usePresalePoolContract = () => {
	return useContract<PresalePool>(
		PreSalePoolABI,
		process.env.REACT_APP_PRESALE_POOL_CONTRACT as string
	);
};
