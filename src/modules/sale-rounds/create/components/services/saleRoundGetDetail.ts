/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';

const APIs = {
	createSaleRound: (id: string) => `/sale-round/${id}`,
};

type Request = any;

type Response = any;

const fetcher = async (_id: Request) => {
	return await axiosClient.get<Request, Response>(APIs.createSaleRound(_id));
};

export const useSaleRoundGetDetail = (id?: string) => {
	const saleroundId = id as string;
	return useQuery(
		[APIs.createSaleRound(saleroundId), saleroundId],
		() => fetcher(saleroundId),
		{
			enabled: !!id,
		}
	);
};
