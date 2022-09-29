import { DNFT } from '../abis/types';
import DNFTABI from '@web3/abis/DNFT.json';
import { useContract } from './useContract';

export const useDNFTContract = () => {
	return useContract<DNFT>(
		DNFTABI,
		process.env.REACT_APP_DNFT_CONTRACT as string
	);
};
