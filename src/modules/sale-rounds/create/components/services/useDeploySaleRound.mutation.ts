import { useMutation } from 'react-query';
import { usePresalePoolContract } from '@web3/contracts';
import { message } from '@common/components';
import { MessageValidations } from '@common/helpers/message';
import { ISaleRoundCreateForm } from '../types';
import { removeComanString } from './helper';
import { useNavigate } from 'react-router';
import { PATHS } from '@common/constants/paths';
import BigNumber from 'bignumber.js';

export const useDeploySaleRound = () => {
	const presalePoolContract = usePresalePoolContract();

	async function deployFn(
		payload: ISaleRoundCreateForm & { salePhase: number }
	) {
		if (!presalePoolContract) return;

		const salePhase = payload.salePhase;
		const _startTime = payload.buy_time.start_time;
		const _endTime = payload.buy_time.end_time;
		const _claimTime = payload.claim_configs.map((el) => el.start_time);
		const _claimRate = payload.claim_configs.map((el) => el.max_claim);
		const _isNoBuyLimit = payload.details.buy_limit === '0' ? true : false;
		const _maxBUSDUserCanSpend = new BigNumber(
			removeComanString(payload.details.buy_limit)
		)
			.times(1e18)
			.toString();
		const _preSaleTokenPrice = new BigNumber(
			removeComanString(payload.exchange_rate)
		)
			.times(1e18)
			.toString();
		const _maxPreSaleAmount = new BigNumber(
			removeComanString(payload.token_info.total_sold_coin)
		)
			.times(1e18)
			.toString();
		const _treasuryAddress = payload.token_info.address;

		const tx = await presalePoolContract.deployNewSalePhase(
			salePhase,
			_startTime,
			_endTime,
			_claimTime,
			_claimRate,
			_isNoBuyLimit,
			_maxBUSDUserCanSpend,
			_preSaleTokenPrice,
			_maxPreSaleAmount,
			_treasuryAddress
		);
		return await tx.wait();
	}
	const navigate = useNavigate();

	const updateMutation = useMutation(deployFn, {
		onSuccess: async () => {
			message.success(MessageValidations.MSC_2_12);
			navigate(PATHS.saleRounds.list());
		},
		onError: (context) => {
			if (String(context).includes('ACTION_REJECTED'))
				message.error(MessageValidations.MSC_2_10);
			else message.error(MessageValidations.MSC_2_11);
		},
	});

	return {
		deploySaleRound: updateMutation.mutate,
		isDeployState: updateMutation.isLoading,
	};
};
