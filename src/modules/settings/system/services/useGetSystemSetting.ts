import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { useMutation } from 'react-query';
import { MESSAGES } from '@common/constants/messages';
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
			message.success(MESSAGES.MSC25);
		} catch (error) {
			message.error(MESSAGES.MSC26);
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
