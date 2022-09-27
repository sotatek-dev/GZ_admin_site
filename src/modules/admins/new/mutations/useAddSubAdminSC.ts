import { message } from 'antd';
import { useMutation } from 'react-query';
import { usePresalePoolContract } from '@web3/contracts/usePresalePoolContract';

export const useAddSubAdminSC = () => {
	const presalePoolContract = usePresalePoolContract();

	/**
	 * Create sub-Admin in Smart contract
	 * @param address of subadmin to create
	 * @returns create transaction
	 */
	async function handleAddSubAdminSC(address: string) {
		try {
			if (!presalePoolContract) return;
			const tx = await presalePoolContract.addSubAdmin(address);
			return await tx.wait();
		} catch (error) {
			message.error('Transaction failed');
		}
	}

	const { mutateAsync: addSubAdminSC } = useMutation(handleAddSubAdminSC);
	return { addSubAdminSC };
};
