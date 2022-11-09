import { useMutation, useQueryClient } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { GET_SYSTEM_SETTING } from '../queries/useGetBESetting';

const UPDATE_SYSTEM_SETTING = '/system-setting';

type UpdateSystemProps = {
	mint_days: number;
};

async function updateSetting(object: UpdateSystemProps) {
	return axiosClient.put<Request, null>(UPDATE_SYSTEM_SETTING, object);
}

export const useUpdateBESetting = () => {
	const queryClient = useQueryClient();

	const updateMutation = useMutation(updateSetting, {
		onSuccess() {
			return queryClient.invalidateQueries([GET_SYSTEM_SETTING]);
		},
	});

	return {
		updateMintDaySystemAdmin: updateMutation.mutateAsync,
		isUpdateMintDays: updateMutation.isLoading,
	};
};
