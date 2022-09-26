import { useMutation } from 'react-query';
import { useBep20Contract } from '@web3/contracts';
import { useActiveWeb3React } from '@web3/hooks';

interface PayloadDeploySaleRound {
	_startTime: number;
	_endTime: number;
	_claimTime: number[];
	_claimRate: number[];
	_isNoBuyLimit: boolean;
	_maxBUSDUserCanSpend: number;
	_preSaleTokenPrice: number;
	_maxPreSaleAmount: number;
	_treasuryAddress: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UseDeployNewSalePhase = () => {
	const { account } = useActiveWeb3React();
	const tokenContract = useBep20Contract(account || '');

	if (!tokenContract || !account) {
		return;
	}

	const deploySaleRound = async (payload: PayloadDeploySaleRound) =>
		tokenContract.deployNewSalePhase(
			payload._startTime,
			payload._endTime,
			payload._claimTime,
			payload._claimRate,
			payload._isNoBuyLimit,
			payload._maxBUSDUserCanSpend,
			payload._preSaleTokenPrice,
			payload._maxPreSaleAmount,
			payload._treasuryAddress
		);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const updateMutation2 = useMutation(deploySaleRound);

	const deployNewSalePhase = async (payload: PayloadDeploySaleRound) => {
		try {
			await updateMutation2.mutateAsync(payload);
		} catch (err) {
			console.log('useDeployNewSalePhase', err);
		}
	};

	return {
		deployNewSalePhase,
		isUpdateSaleround: updateMutation2.isLoading || true,
	};
};
