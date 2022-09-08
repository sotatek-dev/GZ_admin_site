import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin, Pagination } from '@admins/common/types';

const APIs = {
	adminList: '/admin',
};

type Request = {
	limit?: number;
	page?: number;
	query?: string;
	role?: string;
	sortBy?: string;
	status?: string;
};

type Response = {
	list: Admin[];
	pagination: Pagination;
};

const fetcher = (rqBody: Request = { limit: 10, page: 1 }) => {
	return axiosClient.get<Request, Response>(APIs.adminList, { params: rqBody });
};

export const useGetAdmins = () => {
	return useQuery([APIs.adminList], () => fetcher());
};
