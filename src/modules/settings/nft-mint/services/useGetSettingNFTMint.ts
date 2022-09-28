import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { MintPhase, NftMintSetting } from '../types';

const API_SETTING_MINT_NFT = '/setting-mint';

const BE_MintPhase = {
	[MintPhase.Presale1]: 'PRESALE_1',
	[MintPhase.Presale2]: 'PRESALE_2',
	[MintPhase.WhiteList]: 'WHITE_LIST',
	[MintPhase.Public]: 'PUBLIC',
};

type Request = {
	phase: MintPhase;
};

type Response = NftMintSetting;

const fetcher = async (rqBody: Request) => {
	return await axiosClient.get<Request, Response>(API_SETTING_MINT_NFT, {
		params: { type: BE_MintPhase[rqBody.phase] },
	});
};

export const useNFTMintPhaseSetting = (mintPhase: MintPhase) => {
	return useQuery([API_SETTING_MINT_NFT, mintPhase], () =>
		fetcher({ phase: mintPhase })
	);
};
