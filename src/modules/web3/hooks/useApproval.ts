import { useMutation, useQuery, useQueryClient } from 'react-query';
import BigNumber from 'bignumber.js';
import { constants } from 'ethers';
import { formatEther } from 'ethers/lib.esm/utils';
import { toast } from 'react-toastify';
import { useErc20Contract } from '../contracts/useErc20Contract';
import { useActiveWeb3React } from './useActiveWeb3React';

/**
 * Hook for token approving
 * @param tokenAddress token address need to check approval state
 * @param spender which contract address want to use your token
 * @returns approval state and trying approve function
 */
export const useApproval = (tokenAddress: string, spender: string) => {
	const queryClient = useQueryClient();
	const tokenContract = useErc20Contract(tokenAddress);
	const { account } = useActiveWeb3React();

	const getAllowance = async () => {
		if (!tokenContract || !account) return;

		const allowanceAmount = await tokenContract.allowance(account, spender);
		return new BigNumber(formatEther(allowanceAmount));
	};

	const { data: allowanceAmount } = useQuery(
		['getAllowance', tokenAddress, account],
		getAllowance
	);

	/**
	 * Trying approve
	 * @param rethrowErr throw error to outer try/catch block
	 * @returns void
	 */
	const approve = async (rethrowErr?: boolean) => {
		if (!tokenContract) return;

		try {
			const txn = await tokenContract.approve(spender, constants.MaxUint256);
			await txn.wait();
			toast.success('');
		} catch (error) {
			if (rethrowErr) {
				throw error;
			}
		}
	};

	const { mutateAsync: tryApproval, isLoading: isApproving } = useMutation(
		approve,
		{
			onSuccess() {
				queryClient.invalidateQueries(['getAllowanceAmount']);
			},
		}
	);

	return {
		allowanceAmount,
		tryApproval,
		isApproving,
	};
};
