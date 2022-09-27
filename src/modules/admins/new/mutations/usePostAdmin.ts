import { useMutation } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { Admin } from '@admins/common/types';

const APIs = {
	createAdmin: `/admin`,
};

export type RQPostAdmin = Omit<Admin, '_id'>;
type Response = Admin;

async function createFn(rqBody: RQPostAdmin) {
	return axiosClient.post<RQPostAdmin, Response>(APIs.createAdmin, rqBody);
}

export const usePostAdmin = () => {
	const { mutateAsync: postNewAdmin } = useMutation(createFn);
	return { postNewAdmin };
};
