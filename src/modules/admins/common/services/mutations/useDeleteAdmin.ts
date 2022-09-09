import { useMutation, useQueryClient } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin } from '@admins/common/types';
import { ADMIN_APIS } from '../apis';

type Request = {
	id: string;
};

type Response = Admin;

async function deleteFn(id: string) {
	return await axiosClient.delete<Request, Response>(
		ADMIN_APIS.deleteAdmin(id)
	);
}

export const useDeleteAdmin = () => {
	const queryClient = useQueryClient();
	const updateMutation = useMutation(deleteFn);

	const deleteAdmin = async (id: string) => {
		await updateMutation.mutateAsync(id);
		await queryClient.invalidateQueries([ADMIN_APIS.getAll()]);
	};

	return { deleteAdmin };
};
