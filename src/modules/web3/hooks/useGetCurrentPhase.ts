import { useQuery } from 'react-query';
import { usePresalePoolContract } from '@web3/contracts';

export const useGetEndBuyTimePrevious = () => {
	const tokenContract = usePresalePoolContract();

	const getCurrentSalePhase = async () => {
		if (!tokenContract) {
			return;
		}

		const currentSalePhase = await tokenContract.currentSalePhase();
		if (!currentSalePhase) return;
		const inforSalePhase = await tokenContract.salePhaseStatistics(
			currentSalePhase
		);
		if (!inforSalePhase) return;

		return inforSalePhase[1].toString();
	};

	const queryInfor = useQuery(['getCurrentSalePhase'], getCurrentSalePhase);
	return queryInfor;
};
