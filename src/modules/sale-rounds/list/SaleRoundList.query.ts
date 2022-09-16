import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Pagination } from '@admins/common/types';
import { SaleRound } from './types';

type Request = {
	limit?: number;
	page?: number;
	query?: string;
};

type Response = {
	list: SaleRound[];
	pagination: Pagination;
};

const API = '/sale-round';

const fetcher = async (rqBody: Request = { limit: 10, page: 1 }) => {
	return await axiosClient.get<Request, Response>(API, {
		params: rqBody,
	});
};

export const useGetSaleRounds = () => {
	return useQuery([API], () => fetcher());
};
