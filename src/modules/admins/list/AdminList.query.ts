import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin, Pagination } from '@admins/common/types';
import { ADMIN_APIS } from '@admins/common/services/apis';

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

const fetcher = async (rqBody: Request = { limit: 10, page: 1 }) => {
	return await axiosClient.get<Request, Response>(ADMIN_APIS.getAll(), {
		params: rqBody,
	});
};

export const useGetAdmins = () => {
	return useQuery([ADMIN_APIS.getAll()], () => fetcher(), {
		select(data) {
			const pipeAdmin = data.list.map((_admin) => ({
				..._admin,
				full_name: `${_admin.firstname ?? ''} ${_admin.lastname ?? ''}`,
			}));

			return {
				pagination: data.pagination,
				list: pipeAdmin,
			};
		},
	});
};
