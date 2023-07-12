import { BaseContract, ContractInterface, ethers } from 'ethers';
import { useActiveWeb3React } from '../hooks/useActiveWeb3React';
import { getContract } from '../helpers/getContract';
import { useMemo } from 'react';

export const useContract = <T extends BaseContract>(
	abi: ContractInterface,
	address: string
): T | null => {
	const { provider } = useActiveWeb3React();

	return useMemo(() => {
		if (!ethers.utils.isAddress(address)) {
			return null;
		}

		return getContract<T>(abi, address, provider?.getSigner());
	}, [abi, address, provider]);
};
