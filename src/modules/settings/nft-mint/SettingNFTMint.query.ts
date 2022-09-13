import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { MintPhase, NftMintSetting } from './types';

const API_SETTING_MINT_NFT = '/setting-mint';

type Request = {
	type: MintPhase;
};

type Response = NftMintSetting;

const fetcher = async (rqBody: Request) => {
	return await axiosClient.get<Request, Response>(API_SETTING_MINT_NFT, {
		params: rqBody,
	});
};

export const useNFTMintPhaseSetting = (mintPhase: MintPhase) => {
	return useQuery([API_SETTING_MINT_NFT, mintPhase], () =>
		fetcher({ type: mintPhase })
	);
};
