import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { BE_MintPhase } from '@settings/nft-mint/SettingMintNFT.constant';
import { MintPhase, NftMintPhaseSetting } from '@settings/nft-mint/types';

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
		() => getSalePhaseSetting(phase)
	);

	return { isGetPhaseSetting, currentPhaseSetting };
};
