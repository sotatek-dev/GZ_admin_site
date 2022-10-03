import KeyNFTABI from '@web3/abis/KeyNFT.json';
import { useContract } from './useContract';
import { KeyNFT } from '../abis/types';
export const useKeyNFTContract = () => {
	return useContract<KeyNFT>(
		KeyNFTABI,
		process.env.REACT_APP_DKEY_NFT_CONTRACT as string
	);
};
