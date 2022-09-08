import { useMutation } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin } from '@admins/common/types';

const APIs = {
	createAdmin: `/admin`,
};

type Request = Omit<Admin, '_id'>;
type Response = Admin;

async function createFn(rqBody: Request) {
	return axiosClient.post<Request, Response>(APIs.createAdmin, rqBody);
}

export const useCreateAdmin = () => {
	const createMutation = useMutation(createFn);

	const createAdmin = async (newAdmin: Request) => {
		createMutation.mutateAsync(newAdmin);
	};

	return { createAdmin };
};
