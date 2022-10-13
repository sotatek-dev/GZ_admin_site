import { useMutation } from 'react-query';
import { useDNFTContract } from '@web3/contracts/useDNFTContract';
import { NftMintPhaseSetting } from '@settings/nft-mint/types';
import { message } from '@common/components';
import { MessageValidations } from '@common/constants/messages';

export const TX_ERROR_CODE = {
	REJECTED: 'ACTION_REJECTED',
};

/**
 * Handle Smart Contract interaction error
 * @param err error object from try-catch or promise block
 * @param callback callback handler with tx error state, (updating Tx state usually)
 * @returns void
 */
export const handleTxError = (err: unknown) => {
	const { code } = err as { code: string };

	if (code === TX_ERROR_CODE.REJECTED) {
		message.error(MessageValidations.MSC_2_10);
		return;
	}

	throw err;
};

export const useDeploySalePhase = () => {
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

	const updateMutation = useMutation(deployFn);

	return {
		deploySalePhase: updateMutation.mutate,
		isDeploySalePhase: updateMutation.isLoading,
	};
};
