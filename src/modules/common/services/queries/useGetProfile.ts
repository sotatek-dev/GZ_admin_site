import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin } from '@admins/common/types';

export const API_PROFILE = '/profile/admin';

type Response = Admin;

const fetcher = async () => {
	return await axiosClient.get<undefined, Response>(API_PROFILE);
};

export const useGetProfile = (isAuth?: boolean) => {
	return useQuery([API_PROFILE], fetcher, {
		enabled: isAuth,
		select(data) {
			return { ...data, full_name: `${data.firstname} ${data.lastname}` };
		},
	});
};
