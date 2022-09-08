import { useMutation } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin } from '@admins/common/types';

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
	const updateMutation = useMutation(updateFn);

	const updateAdmin = async (newAdmin: Admin) => {
		updateMutation.mutateAsync(newAdmin);
	};

	return { updateAdmin };
};
