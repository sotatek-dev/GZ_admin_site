import { useMutation, useQueryClient } from 'react-query';
import { message } from '@common/components';
import { axiosClient } from '@common/services/apiClient';
import { Admin } from '@admins/common/types';
import { API_PROFILE } from '@common/services/queries/useGetProfile';
import { MESSAGES } from '@common/constants/messages';
import { useNavigate } from 'react-router';
import { PATHS } from '@common/constants/paths';

const API = '/profile/admin';

type Request = {
	id: string;
};

type Response = Admin;

async function updateFn(rqBody: Admin) {
	return axiosClient.put<Request, Response>(API, rqBody);
}

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();
	const updateMutation = useMutation(updateFn);
	const navigate = useNavigate();

	const updateProfile = async (newAdmin: Admin) => {
		try {
			await updateMutation.mutateAsync(newAdmin);
			await queryClient.invalidateQueries([API_PROFILE]);
			message.success(MESSAGES.MC8);
			navigate(PATHS.admins.list());
		} catch (error) {
			message.error(MESSAGES.MC9);
		}
	};

	return { updateProfile, isUpdateProfile: updateMutation.isLoading };
};
