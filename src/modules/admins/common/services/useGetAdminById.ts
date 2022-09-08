import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin } from '../types';

const APIs = {
	getAdminById: (id: string) => `/admin/${id}`,
};

type Request = {
	id: string;
};

type Response = Admin;

const fetcher = (id: string) => {
	return axiosClient.get<Request, Response>(APIs.getAdminById(id));
};

export const useGetAdminById = (id?: string) => {
	return useQuery([APIs.getAdminById], () => fetcher(id as string), {
		enabled: !!id,
	});
};
