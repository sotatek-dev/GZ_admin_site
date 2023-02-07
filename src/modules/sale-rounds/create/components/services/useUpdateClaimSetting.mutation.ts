import { useMutation } from 'react-query';
import { usePresalePoolContract } from '@web3/contracts';
import { message } from '@common/components';
import { MessageValidations } from '@common/constants/messages';
import { DataClaimConfig } from '../types';

export const useUpdateClaimSetting = () => {
	const presalePoolContract = usePresalePoolContract();

	async function deployFn(payload: {
		claim_configs: DataClaimConfig[];
		salePhase: number;
	}) {
		if (!presalePoolContract) return;

		const salePhase = payload.salePhase;
		const _claimTime = payload.claim_configs.map((el) => el.start_time);
		const _claimRate = payload.claim_configs.map((el) => el.max_claim);

		const tx = await presalePoolContract.updateClaimSetting(
			salePhase,
			_claimTime,
			_claimRate
		);
		return await tx.wait();
	}

	const updateMutation = useMutation(deployFn, {
		onSuccess: async () => {
			message.success(MessageValidations.MSC_2_12);
		},
		onError: (context) => {
			if (String(context).includes('ACTION_REJECTED'))
				message.error(MessageValidations.MSC_2_10);
			else message.error(MessageValidations.MSC_2_11);
		},
	});

	return {
		updateClaimSetting: updateMutation.mutate,
		isUpdateClaimSetting: updateMutation.isLoading,
		statusUpdateClaimSetting: updateMutation.status,
	};
};
