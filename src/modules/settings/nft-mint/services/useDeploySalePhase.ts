import { useMutation, useQueryClient } from 'react-query';
import { useDNFTContract } from '@web3/contracts/useDNFTContract';
import { NftMintPhaseSetting } from '@settings/nft-mint/types';
import { message } from '@common/components';
import { MessageValidations } from '@common/constants/messages';
import { GET_CURRENT_MINT_PHASE } from './useGetCurrentPhase';
import { handleTxError } from '@common/helpers/error-handle';

export const useDeploySalePhase = () => {
	const queryClient = useQueryClient();
	const dNFTContract = useDNFTContract();

	const execDeployTx = async (tx: Awaited<ReturnType<typeof makeDeployTx>>) => {
		try {
			if (!tx) return;
			await tx.wait();
			message.success(MessageValidations.MSC_2_12);
		} catch {
			message.error(MessageValidations.MSC_2_11);
		}
	};

	const makeDeployTx = async (phaseSetting: Parameters<typeof deployFn>[0]) => {
		if (!dNFTContract) return;

		try {
			const {
				_id: _salePhase,
				end_mint_time,
				nft_mint_limit,
				price,
				price_after_24h,
				start_mint_time,
			} = phaseSetting;

			const tx = await dNFTContract.deployNewSalePhase(
				_salePhase,
				start_mint_time,
				end_mint_time,
				price,
				price_after_24h,
				nft_mint_limit
			);
			return tx;
		} catch (error) {
			handleTxError(error);
		}
	};

	const deployFn = async (
		phaseSetting: Omit<NftMintPhaseSetting, 'type'>
	): Promise<void> => {
		const tx = await makeDeployTx(phaseSetting);
		return await execDeployTx(tx);
	};

	const updateMutation = useMutation(deployFn, {
		onSuccess() {
			return queryClient.invalidateQueries([GET_CURRENT_MINT_PHASE]);
		},
	});

	return {
		deploySalePhase: updateMutation.mutate,
		isDeploySalePhase: updateMutation.isLoading,
	};
};
