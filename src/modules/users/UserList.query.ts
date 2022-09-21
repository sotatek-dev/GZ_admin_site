import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Pagination } from '@admins/common/types';
import { User } from './types';
import { DEFAULT_PAGINATION } from '@common/constants/pagination';

type Request = {
	limit?: number;
	page?: number;
	query?: string;
};

type Response = {
	list: User[];
	pagination: Pagination;
};

const API = '/user/view';

const fetcher = async (rqBody: Request) => {
	return await axiosClient.get<Request, Response>(API, {
		params: { ...DEFAULT_PAGINATION, ...rqBody },
	});
};

export const useGetUsers = (page: number, query: string) => {
	return useQuery([API, query, page], () => fetcher({ page, query }));
};
