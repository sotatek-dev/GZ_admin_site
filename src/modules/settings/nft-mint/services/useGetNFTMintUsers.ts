import { axiosClient } from '@common/services/apiClient';
import { useQuery } from 'react-query';
import { MintNFTUser, MintPhase } from '@settings/nft-mint/types';
import { BE_MintPhase } from '../SettingMintNFT.constant';
import { Pagination } from '@admins/common/types';

interface Response {
	list: MintNFTUser[];
	pagination: Pagination;
}

interface Request {
	limit: number;
	page: number;
	phase: MintPhase;
}

export const API_GET_WHITELISTED_USER = '/whitelisted-user/mint-nft';

const fetcher = async (rqBody: Request) => {
	return await axiosClient.get<Request, Response>(API_GET_WHITELISTED_USER, {
		params: {
			limit: rqBody.limit,
			page: rqBody.page,
			phase: BE_MintPhase[rqBody.phase],
		},
	});
};

export const useGetNFTMintUsers = (rqBody: Request) => {
	return useQuery([API_GET_WHITELISTED_USER, rqBody], () => fetcher(rqBody), {
		keepPreviousData: true,
	});
};
