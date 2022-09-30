import { useQuery } from 'react-query';
import { MintPhase } from '../types';
import { useDNFTContract } from '@web3/contracts/useDNFTContract';

export const useGetCurrentPhase = () => {
	const dNFTContract = useDNFTContract();

	const getCurrentSalePhase = async () => {
		if (!dNFTContract) return;
		return await dNFTContract.currentSalePhase();
	};

	const { data: currentPhase } = useQuery(
		['getCurrentSalePhase'],
		() => getCurrentSalePhase(),
		{
			select(data) {
				return data as MintPhase | undefined;
			},
		}
	);

	return { currentPhase };
};
