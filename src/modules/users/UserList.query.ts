import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Pagination } from '@admins/common/types';
import { User } from './types';

const pagination = {
	page: 1,
	limit: 30,
};

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
		params: { ...pagination, ...rqBody },
	});
};

export const useGetUsers = (page: number, query: string) => {
	return useQuery([API, query, page], () => fetcher({ page, query }));
};
