import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { BE_MintPhase } from '@settings/nft-mint/SettingMintNFT.constant';
import { MintPhase, NftMintPhaseSetting } from '@settings/nft-mint/types';
import { formatNumberClaim } from '@common/helpers/formats';
import BigNumber from 'bignumber.js';

export const API_GET_SETTING_MINT = '/setting-mint';
type Request = MintPhase;
type Response = NftMintPhaseSetting;

const getSalePhaseSetting = async (phase: Request) => {
	return await axiosClient.get<Request, Response>(API_GET_SETTING_MINT, {
		params: {
			type: BE_MintPhase[phase],
		},
	});
};

export const useNFTMintPhaseSetting = (phase: MintPhase) => {
	const { data: currentPhaseSetting, isLoading: isGetPhaseSetting } = useQuery(
		[API_GET_SETTING_MINT, phase],
		() => getSalePhaseSetting(phase),
		{
			select(data) {
				return {
					...data,
					price: formatNumberClaim(data.price),
					price_after_24h: formatNumberClaim(data.price_after_24h),
					nft_mint_limit: new BigNumber(
						new BigNumber(data.nft_mint_limit).decimalPlaces(
							4,
							BigNumber.ROUND_DOWN
						)
					).toFormat(),
				};
			},
		}
	);

	return { isGetPhaseSetting, currentPhaseSetting };
};
