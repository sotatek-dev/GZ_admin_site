import { useMutation } from 'react-query';
import { useDNFTContract } from '@web3/contracts/useDNFTContract';
import { NftMintPhaseSetting } from '@settings/nft-mint/types';
import { message } from '@common/components';
import BigNumber from 'bignumber.js';

export const useDeploySalePhase = () => {
	const dNFTContract = useDNFTContract();

	const deployFn = async (phaseSetting: NftMintPhaseSetting) => {
		if (!dNFTContract) return;

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
			new BigNumber(price).times(1e18).toString(),
			new BigNumber(price_after_24h).times(1e18).toString(),
			nft_mint_limit
		);
		return await tx.wait();
	};

	const updateMutation = useMutation(deployFn, {
		onSuccess() {
			message.success('Update successful');
		},
		onError() {
			message.error('Update failed');
		},
	});

	return {
		deploySalePhase: updateMutation.mutate,
		isDeploySalePhase: updateMutation.isLoading,
	};
};
