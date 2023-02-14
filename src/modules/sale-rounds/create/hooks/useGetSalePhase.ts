import { useQuery } from 'react-query';
import { usePresalePoolContract } from '@web3/contracts';

export const useSalePhaseStatistics = (salePhase: number) => {
	const tokenContract = usePresalePoolContract();

	const getSalePhase = async (salePhase: number) => {
		if (!tokenContract) {
			return;
		}

		const inforSalePhase = await tokenContract.salePhaseStatistics(salePhase);
		if (!inforSalePhase) return;
		return inforSalePhase;
	};

	const queryInfor = useQuery(['getCurrentSalePhase'], () =>
		getSalePhase(salePhase)
	);
	return queryInfor;
};
