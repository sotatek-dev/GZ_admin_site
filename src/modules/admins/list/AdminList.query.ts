import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin, Pagination } from '@admins/common/types';
import { ADMIN_APIS } from '@admins/common/services/apis';
import { DEFAULT_PAGINATION } from '@common/constants/pagination';

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

const fetcher = async (rqBody: Request) => {
	return await axiosClient.get<Request, Response>(ADMIN_APIS.getAll(), {
		params: { ...DEFAULT_PAGINATION, ...rqBody },
	});
};

export const useGetAdmins = (page: number, query: string) => {
	return useQuery(
		[ADMIN_APIS.getAll(), page, query],
		() => fetcher({ page, query }),
		{
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
		}
	);
};
