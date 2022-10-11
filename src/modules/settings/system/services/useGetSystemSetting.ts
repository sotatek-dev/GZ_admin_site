import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { useMutation } from 'react-query';
import { message } from '@common/components';
import { Admin, Pagination } from '@admins/common/types';
type Response = {
	list: Admin[];
	pagination: Pagination;
};

type UpdateSystemProps = {
	mint_days: number;
};

const API = '/system-setting';

const fetcher = async () => {
	return await axiosClient.get<null, Response>(API);
};

async function updateSystem(object: UpdateSystemProps) {
	return axiosClient.put<Request, Response>(API, object);
}
export const useUpdateSystem = () => {
	const updateMutation = useMutation(updateSystem);
	const updateMintDaySystemAdmin = async (object: UpdateSystemProps) => {
		try {
			await updateMutation.mutateAsync(object);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			message.error(error?.response?.data?.message || '');
		}
	};

	return {
		updateMintDaySystemAdmin,
		isLoadingSystem: updateMutation.isLoading,
	};
};
export const useGetSystemSetting = () => {
	return useQuery([API], fetcher);
};
