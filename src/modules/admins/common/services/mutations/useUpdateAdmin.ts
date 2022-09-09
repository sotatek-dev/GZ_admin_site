import { useMutation, useQueryClient } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin } from '@admins/common/types';
import { ADMIN_APIS } from '../apis';

const APIs = {
	updateAdmin: (id: string) => `/admin/${id}`,
};

type Request = {
	id: string;
};

type Response = Admin;

async function updateFn(rqBody: Admin) {
	return axiosClient.put<Request, Response>(
		APIs.updateAdmin(rqBody._id),
		rqBody
	);
}

export const useUpdateAdmin = () => {
	const queryClient = useQueryClient();
	const updateMutation = useMutation(updateFn);

	const updateAdmin = async (newAdmin: Admin) => {
		await updateMutation.mutateAsync(newAdmin);
		await queryClient.invalidateQueries([ADMIN_APIS.getAll()]);
	};

	return { updateAdmin, isUpdateAdmin: updateMutation.isLoading };
};
