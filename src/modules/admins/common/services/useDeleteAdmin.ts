import { useMutation } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin } from '../types';

const APIs = {
	deleteAdmin: (id: string) => `/admin/${id}`,
};

type Request = {
	id: string;
};

type Response = Admin;

async function deleteFn(id: string) {
	return axiosClient.delete<Request, Response>(APIs.deleteAdmin(id));
}

export const useDeleteAdmin = () => {
	const updateMutation = useMutation(deleteFn);

	const deleteAdmin = async (id: string) => {
		updateMutation.mutateAsync(id);
	};

	return { deleteAdmin };
};
