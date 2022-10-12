import { useQuery } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { utils } from 'ethers';

export const API_GET_ADDRESS = (address: string) =>
	`/admin/validate/${address}`;

type Response = {
	isWalletExist: boolean;
};

export const fetchWallet = async (address: string) => {
	if (!utils.isAddress(address)) return;

	return await axiosClient.get<undefined, Response>(API_GET_ADDRESS(address));
};

export const useCheckAddress = (address: string | undefined) => {
	return useQuery(
		[API_GET_ADDRESS(address as string)],
		() => fetchWallet(address as string),
		{
			enabled: !!address,
		}
	);
};
