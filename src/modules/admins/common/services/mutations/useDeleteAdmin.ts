import { useMutation } from 'react-query';
import { usePresalePoolContract } from '@web3/contracts';
import { message } from '@common/components';

export const useDeleteAdmin = () => {
	const presalePoolContract = usePresalePoolContract();

	async function deleteFn(address: string) {
		if (!presalePoolContract) return;
		const tx = await presalePoolContract.removeSubAdmin(address);
		return await tx.wait();
	}

	const updateMutation = useMutation(deleteFn, {
		onSuccess() {
			message.success('Delete successfully');
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
