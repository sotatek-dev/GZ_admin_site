/* eslint-disable no-console */
import { ExternalProvider } from '@ethersproject/providers';
import { toast } from 'react-toastify';
import { ETH_CHAIN_ID } from '../constants/envs';
import { SUPPORTED_NETWORKS } from '../constants/networks';

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @param externalProvider
 * @returns Promise<true> if the setup succeeded, false otherwise
 */
export const setupNetwork = async (
	externalProvider?: ExternalProvider,
	chainNetworkId?: string
): Promise<boolean> => {
	const provider = externalProvider || window.ethereum;
	const chainId =
		(chainNetworkId && parseInt(chainNetworkId, 10)) || ETH_CHAIN_ID;

	if (!SUPPORTED_NETWORKS[chainId]) {
		toast.error('Not support network!');
		return false;
	}

	if (provider) {
		try {
			await provider.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: `0x${chainId.toString(16)}` }],
			});

			return true;
		} catch (switchError) {
			const error = switchError as { code: number; message: string };
			if (
				error?.code === 4902 ||
				error?.code === -32603 ||
				(error?.code === -32000 &&
					error?.message?.includes('wallet_addEthereumChain'))
			) {
				try {
					await provider.request({
						method: 'wallet_addEthereumChain',
						params: [
							{
								chainId: `0x${chainId.toString(16)}`,
								chainName: SUPPORTED_NETWORKS[chainId].chainName,
								nativeCurrency: SUPPORTED_NETWORKS[chainId].nativeCurrency,
								rpcUrls: SUPPORTED_NETWORKS[chainId].rpcUrls,
								blockExplorerUrls:
									SUPPORTED_NETWORKS[chainId].blockExplorerUrls,
							},
						],
					});
					return true;
				} catch (error) {
					toast.error(
						`Failed to setup the network in Metamask: ${SUPPORTED_NETWORKS[chainId].chainName}`
					);
					return false;
				}
			}
			toast.error(error?.message);
			return false;
		}
	} else {
		toast.warn('Not get provider');
		console.error(
			`Can't setup the ${SUPPORTED_NETWORKS[chainId].chainName} network on metamask because window.ethereum is undefined`
		);
		return false;
	}
};
