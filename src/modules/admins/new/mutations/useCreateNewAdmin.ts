import { PATHS } from '@common/constants/paths';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { useAddSubAdminSC } from './useAddSubAdminSC';
import { RQPostAdmin, usePostAdmin } from './usePostAdmin';

export const useCreateNewAdmin = () => {
	const navigate = useNavigate();
	const { addSubAdminSC } = useAddSubAdminSC();
	const { postNewAdmin } = usePostAdmin();

	const createNewAdmin = async (rqBody: RQPostAdmin) => {
		const newAdmin = await postNewAdmin(rqBody);
		await addSubAdminSC(newAdmin.wallet_address);
	};

	const { mutate, isLoading } = useMutation(createNewAdmin, {
		onSuccess: () => {
			navigate(PATHS.admins.list());
		},
	});
	return { createNewAdmin: mutate, isCreateNewAdmin: isLoading };
};
