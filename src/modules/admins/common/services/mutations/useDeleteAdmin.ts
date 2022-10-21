import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { usePresalePoolContract } from '@web3/contracts';
import { PATHS } from '@common/constants/paths';
import { message } from '@common/components';

export const useDeleteAdmin = () => {
	const navigate = useNavigate();
	const presalePoolContract = usePresalePoolContract();

	async function deleteFn(address: string) {
		if (!presalePoolContract) return;
		const tx = await presalePoolContract.removeSubAdmin(address);
		return await tx.wait();
	}

	const updateMutation = useMutation(deleteFn, {
		onSuccess() {
			message.success('Delete successfully');
			navigate(PATHS.admins.list());
		},
		onError() {
			message.error('Delete failed');
		},
	});

	return {
		deleteAdmin: updateMutation.mutate,
		isDeleting: updateMutation.isLoading,
	};
};
