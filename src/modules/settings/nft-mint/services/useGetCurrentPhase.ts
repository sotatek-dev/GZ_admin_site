import { useQuery } from 'react-query';
import { MintPhase } from '../types';
import { useDNFTContract } from '@web3/contracts/useDNFTContract';

export const GET_CURRENT_MINT_PHASE = 'getCurrentSalePhase';

export const useGetCurrentPhase = () => {
	const dNFTContract = useDNFTContract();

	const getCurrentSalePhase = async () => {
		if (!dNFTContract) return;
		return await dNFTContract.currentSalePhase();
	};

	const { data: currentPhase } = useQuery(
		[GET_CURRENT_MINT_PHASE],
		() => getCurrentSalePhase(),
		{
			select(data) {
				return data as MintPhase | undefined;
			},
		}
	);

	return { currentPhase };
};
