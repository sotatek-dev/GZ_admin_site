import { axiosClient } from '@common/services/apiClient';
import { useQuery } from 'react-query';

interface Response {
	mint_days: number;
}

export const GET_SYSTEM_SETTING = '/system-setting';

const fetcher = async () => {
	return await axiosClient.get<null, Response>(GET_SYSTEM_SETTING);
};

export const useGetBESetting = () => {
	const { data: BESetting, isLoading: isGetBESetting } = useQuery(
		[GET_SYSTEM_SETTING],
		fetcher
	);
	return { BESetting, isGetBESetting };
};
