import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Pagination } from '@admins/common/types';
import { User } from './types';

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

const fetcher = async (rqBody: Request = { limit: 10, page: 1 }) => {
	return await axiosClient.get<Request, Response>(API, {
		params: rqBody,
	});
};

export const useGetUsers = () => {
	return useQuery([API], () => fetcher());
};
