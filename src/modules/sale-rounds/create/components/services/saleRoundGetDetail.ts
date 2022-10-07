/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { formatNumberClaim } from './helper';

const APIs = {
	getSaleRound: (id: string) => `/sale-round/${id}`,
};

type Request = string;

type Response = any;

const fetcher = async (_id: string) => {
	return await axiosClient.get<Request, Response>(APIs.getSaleRound(_id));
};

export const useSaleRoundGetDetail = (id?: string) => {
	const saleroundId = id as string;
	const queryInfo = useQuery(
		[APIs.getSaleRound(saleroundId), saleroundId],
		() => fetcher(saleroundId),
		{
			enabled: !!id,
		}
	);

	if (!queryInfo.isFetched || !queryInfo?.data) return queryInfo;

	return {
		...queryInfo,
		data: {
			...queryInfo?.data,
			details: {
				network: queryInfo?.data?.details?.network,
				buy_limit: formatNumberClaim(queryInfo?.data?.details?.buy_limit),
			},
			exchange_rate: formatNumberClaim(queryInfo?.data?.exchange_rate),
			token_info: {
				address: queryInfo?.data?.token_info?.address,
				total_sold_coin: formatNumberClaim(
					queryInfo?.data?.token_info?.total_sold_coin
				),
			},
		},
	};
};
