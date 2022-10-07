import { PATHS } from '@common/constants/paths';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { useAddSubAdminSC } from './useAddSubAdminSC';
import { RQPostAdmin, usePostAdmin } from './usePostAdmin';
import { ADMIN_APIS } from '@admins/common/services/apis';

export const useCreateNewAdmin = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { addSubAdminSC } = useAddSubAdminSC();
	const { postNewAdmin } = usePostAdmin();

	const createNewAdmin = async (rqBody: RQPostAdmin) => {
		const newAdmin = await postNewAdmin(rqBody);
		await addSubAdminSC(newAdmin.wallet_address);
		await queryClient.refetchQueries([ADMIN_APIS.getAll()]);
	};

	const { mutate, isLoading } = useMutation(createNewAdmin, {
		onSuccess: () => {
			navigate(PATHS.admins.list());
		},
	});
	return { createNewAdmin: mutate, isCreateNewAdmin: isLoading };
};
