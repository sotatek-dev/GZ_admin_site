import BigNumber from 'bignumber.js';
import { formatEther } from 'ethers/lib.esm/utils';
import { useQuery } from 'react-query';
import { BIG_ZERO } from '@common/constants/bignumbers';
import { useErc20Contract } from '@web3/contracts';
import { useActiveWeb3React } from '@web3/hooks';

export const useBalance = (address: string) => {
	const { account } = useActiveWeb3React();
	const tokenContract = useErc20Contract(address);

	const getBalance = async () => {
		if (!tokenContract || !account) {
			return;
		}

		const balance = await tokenContract.balanceOf(account);
		return new BigNumber(formatEther(balance));
	};

	const { data: balance } = useQuery(['getBalance', address], getBalance);
	return balance ?? BIG_ZERO;
};
