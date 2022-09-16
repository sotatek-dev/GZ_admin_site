import { useMutation, useQueryClient } from 'react-query';
import { message } from '@common/components';
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
		try {
			await createMutation.mutateAsync(newAdmin);
			await queryClient.invalidateQueries([ADMIN_APIS.getAll()]);
			message.success('Success');
		} catch (error) {
			message.error('Failed');
		}
	};

	return { createAdmin, isCreatingAdmin: createMutation.isLoading };
};
