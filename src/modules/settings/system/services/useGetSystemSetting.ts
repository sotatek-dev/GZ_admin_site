import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin, Pagination } from '@admins/common/types';

type Response = {
	list: Admin[];
	pagination: Pagination;
};

const API = '/system-setting';

const fetcher = async () => {
	return await axiosClient.get<null, Response>(API);
};

export const useGetSystemSetting = () => {
	return useQuery([API], fetcher);
};
