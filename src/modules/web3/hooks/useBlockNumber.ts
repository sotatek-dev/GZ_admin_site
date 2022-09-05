import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useQuery, useQueryClient } from 'react-query';
import { useActiveWeb3React } from './useActiveWeb3React';

type Params = {
	onBlock?: (block: number) => void;
};

export const useBlockNumber = ({ onBlock }: Params) => {
	const queryClient = useQueryClient();
	const { library: provider, chainId } = useActiveWeb3React();

	React.useEffect(() => {
		if (!provider) {
			return;
		}

		function listener(blockNumber: number) {
			// Just to be safe in case the provider implementation
			// calls the event callback after .off() has been called
			queryClient.setQueryData(queryKey({ chainId }), blockNumber);

			if (onBlock) onBlock(blockNumber);
		}

		provider.on('block', listener);

		return () => {
			provider.off('block', listener);
		};
	}, [provider, onBlock, chainId, queryClient]);

	return useQuery(
		queryKey({ chainId }),
		() => fetchBlockNumber({ provider } as { provider: Web3Provider }),
		{
			enabled: !!provider,
		}
	);
};

const queryKey = ({ chainId }: { chainId?: number }) => {
	return ['fetchBlockNumber', chainId];
};

export async function fetchBlockNumber({
	provider,
}: {
	provider: Web3Provider;
}): Promise<number> {
	const blockNumber = await provider.getBlockNumber();
	return blockNumber;
}
