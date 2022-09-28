import { useMutation } from 'react-query';
import { message } from '@common/components';
import { useDNFTContract } from '@web3/contracts/useDNFTContract';
import { MintPhase } from '../types';
import BigNumber from 'bignumber.js';

interface Request {
	_id: MintPhase;
	start_mint_time: number;
	end_mint_time: number;
	price: string;
	price_after_24h: string;
	nft_mint_limit: string;
}

export const useUpdateNFTMintSetting = () => {
	const dNFTContract = useDNFTContract();

	const updateSalePhase = async (rqBody: Request) => {
		if (!dNFTContract) return;

		const {
			_id,
			end_mint_time,
			nft_mint_limit,
			price,
			price_after_24h,
			start_mint_time,
		} = rqBody;
		const tx = await dNFTContract.editSalePhase(
			_id,
			start_mint_time,
			end_mint_time,
			new BigNumber(price).multipliedBy(1e18).toString(),
			new BigNumber(price_after_24h).multipliedBy(1e18).toString(),
			new BigNumber(nft_mint_limit).multipliedBy(1e18).toString()
		);
		return await tx.wait();
	};

	const updateMutation = useMutation(updateSalePhase, {
		onSuccess() {
			message.success('Update succeed');
		},
		onError() {
			message.error('Update failed');
		},
	});

	return {
		updateNftMintSetting: updateMutation.mutate,
		isUpdateNftMintSetting: updateMutation.isLoading,
	};
};
