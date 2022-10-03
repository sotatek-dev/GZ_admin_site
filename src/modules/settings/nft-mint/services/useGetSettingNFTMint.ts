import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { BE_MintPhase } from '@settings/nft-mint/SettingMintNFT.constant';
import { MintPhase, NftMintPhaseSetting } from '@settings/nft-mint/types';

const API = '/setting-mint';
type Request = MintPhase;
type Response = NftMintPhaseSetting;

const getSalePhaseSetting = async (phase: Request) => {
	return await axiosClient.get<Request, Response>(API, {
		params: {
			type: BE_MintPhase[phase],
		},
	});
};

export const useNFTMintPhaseSetting = (phase: MintPhase) => {
	const { data: currentPhaseSetting, isLoading: isGetPhaseSetting } = useQuery(
		[API, phase],
		() => getSalePhaseSetting(phase)
	);

	return { isGetPhaseSetting, currentPhaseSetting };
};
