import { useMutation, useQueryClient } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin } from '@admins/common/types';
import { ADMIN_APIS } from '@admins/common/services/apis';

const APIs = {
	createAdmin: `/admin`,
};

type Request = Omit<Admin, '_id'>;
type Response = Admin;

async function createFn(rqBody: Request) {
	return axiosClient.post<Request, Response>(APIs.createAdmin, rqBody);
}

export const useCreateAdmin = () => {
	const queryClient = useQueryClient();
	const createMutation = useMutation(createFn);

	const createAdmin = async (newAdmin: Request) => {
		await createMutation.mutateAsync(newAdmin);
		await queryClient.invalidateQueries([ADMIN_APIS.getAll()]);
	};

	return { createAdmin, isCreatingAdmin: createMutation.isLoading };
};
