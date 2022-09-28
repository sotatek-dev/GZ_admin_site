import { DNFT } from '../abis/types';
import DNFTABI from '@web3/abis/DNFT.json';
import { useContract } from './useContract';

export const useDNFTContract = () => {
	return useContract<DNFT>(
		DNFTABI,
		'0x9c94442927Abb5Da3848eA960d3FA0C47B13971A'
	);
};
