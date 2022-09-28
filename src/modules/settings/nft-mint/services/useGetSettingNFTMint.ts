import { useQuery } from 'react-query';
import { MintPhase } from '../types';
import { useDNFTContract } from '@web3/contracts/useDNFTContract';
import BigNumber from 'bignumber.js';

type Request = {
	_id: MintPhase;
};

export const useNFTMintPhaseSetting = (mintPhase: MintPhase) => {
	const dNFTContract = useDNFTContract();

	const getSalePhaseSetting = async (rqBody: Request) => {
		if (!dNFTContract) return;
		return await dNFTContract.salePhaseStatistics(rqBody._id);
	};

	const getCurrentSalePhase = async () => {
		if (!dNFTContract) return;
		return await dNFTContract.currentSalePhase();
	};

	const { data: currentPhaseSetting } = useQuery(
		['salePhaseStatistics', mintPhase],
		() => getSalePhaseSetting({ _id: mintPhase }),
		{
			select(data) {
				if (!data) return data;

				const [
					startTime,
					endTime,
					priceInBUSD,
					priceAfter24Hours,
					maxAmountUserCanBuy,
				] = data;
				return {
					_id: mintPhase,
					type: mintPhase,
					price: new BigNumber(priceInBUSD.toString())
						.dividedBy(1e18)
						.toString(),
					price_after_24h: new BigNumber(priceAfter24Hours.toString())
						.dividedBy(1e18)
						.toString(),
					nft_mint_limit: new BigNumber(maxAmountUserCanBuy.toString())
						.dividedBy(1e18)
						.toString(),
					start_mint_time: new BigNumber(startTime.toString()).toNumber(),
					end_mint_time: new BigNumber(endTime.toString()).toNumber(),
				};
			},
		}
	);

	const { data: currentPhase } = useQuery(
		['getCurrentSalePhase'],
		() => getCurrentSalePhase(),
		{
			select(data) {
				return data as MintPhase | undefined;
			},
		}
	);

	return { currentPhase, currentPhaseSetting };
};
