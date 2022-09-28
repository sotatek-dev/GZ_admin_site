import { useMutation } from 'react-query';
import { message } from '@common/components';
import { useDNFTContract } from '@web3/contracts/useDNFTContract';
import { MintPhase } from '../types';
import BigNumber from 'bignumber.js';

interface Request {
	_id: MintPhase;
	start_mint_time: number;
	end_mint_time: number;
	price: number;
	price_after_24h: number;
	nft_mint_limit: number;
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
		return await dNFTContract.editSalePhase(
			_id,
			start_mint_time,
			end_mint_time,
			new BigNumber(price).multipliedBy(1e18).toString(),
			new BigNumber(price_after_24h).multipliedBy(1e18).toString(),
			new BigNumber(nft_mint_limit).multipliedBy(1e18).toString()
		);
	};

	const updateMutation = useMutation(updateSalePhase);

	const updateNftMintSetting = async (newSetting: Request) => {
		try {
			await updateMutation.mutateAsync(newSetting);
			message.success('Update succeed');
		} catch (error) {
			message.error('Update failed');
		}
	};

	return {
		updateNftMintSetting,
		isUpdateNftMintSetting: updateMutation.isLoading,
	};
};
