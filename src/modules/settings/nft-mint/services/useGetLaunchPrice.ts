import { useDNFTContract } from '@web3/contracts/useDNFTContract';
import BigNumber from 'bignumber.js';
import { formatEther } from 'ethers/lib/utils';
import { useQuery } from 'react-query';

export const FETCH_LAUNCH_PRICE_QUERY_KEY = 'fetchdNFTLaunchPrice';

export const useGetLaunchPrice = () => {
	const dnftContract = useDNFTContract();

	const fetchdNFTLaunchPrice = async () => {
		if (!dnftContract) return;

		const launchPrice = await dnftContract.launchPrice();
		return new BigNumber(formatEther(launchPrice));
	};

	const { data: launchPrice, isLoading: isFetchLaunchPrice } = useQuery(
		[FETCH_LAUNCH_PRICE_QUERY_KEY],
		fetchdNFTLaunchPrice
	);

	return { launchPrice, isFetchLaunchPrice };
};
