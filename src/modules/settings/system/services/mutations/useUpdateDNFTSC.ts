import { useMutation, useQueryClient } from 'react-query';
import { useDNFTContract } from '@web3/contracts/useDNFTContract';
import { querySCSettingKeys } from '../queries/useGetSCSetting';
import { FETCH_LAUNCH_PRICE_QUERY_KEY } from '@settings/nft-mint/services/useGetLaunchPrice';

export const useUpdateDNFTSC = () => {
	const queryClient = useQueryClient();
	const dNFTContract = useDNFTContract();

	async function handleUpdateMinTokenMintDNFTSC(key_mint_min_token: string) {
		if (!dNFTContract) return;
		const tx = await dNFTContract.setMinimumGalactixTokenRequire(
			key_mint_min_token
		);
		return await tx.wait();
	}
	async function handleUpdateRescurPriceDNFTSC(rescure_price: string) {
		if (!dNFTContract) return;
		const tx = await dNFTContract.setRescuePrice(rescure_price);
		return await tx.wait();
	}
	async function handleUpdateTreasuryAddressDNFTSC(treasury_address: string) {
		if (!dNFTContract) return;
		const tx = await dNFTContract.setTreasuryAddress(treasury_address);
		return await tx.wait();
	}

	async function handleUpdateLaunchPrice(launch_price: string) {
		if (!dNFTContract) return;
		const tx = await dNFTContract.setLaunchPrice(launch_price);
		return await tx.wait();
	}

	const {
		mutateAsync: updateRescurPriceDNFTSC,
		isLoading: isUpdateRescuePrice,
	} = useMutation(handleUpdateRescurPriceDNFTSC, {
		onSuccess() {
			return queryClient.invalidateQueries([querySCSettingKeys.rescuePrice]);
		},
	});
	const { mutateAsync: updateMinTokenMintKeySC, isLoading: isUpdateMinToken } =
		useMutation(handleUpdateMinTokenMintDNFTSC, {
			onSuccess() {
				return queryClient.invalidateQueries([querySCSettingKeys.minimumToken]);
			},
		});
	const {
		mutateAsync: updateTreasuryAddressDNFTSC,
		isLoading: isUpdateTreasuryDNFT,
	} = useMutation(handleUpdateTreasuryAddressDNFTSC, {
		onSuccess() {
			return queryClient.invalidateQueries([
				querySCSettingKeys.treasuryAddress,
			]);
		},
	});
	const {
		mutateAsync: updateDNFTLaunchPrice,
		isLoading: isUpdateDNFTLaunchPrice,
	} = useMutation(handleUpdateLaunchPrice, {
		onSuccess() {
			return queryClient.invalidateQueries([FETCH_LAUNCH_PRICE_QUERY_KEY]);
		},
	});

	return {
		updateRescurPriceDNFTSC,
		updateMinTokenMintKeySC,
		updateTreasuryAddressDNFTSC,
		updateDNFTLaunchPrice,
		isUpdateDNFTSetting:
			isUpdateRescuePrice ||
			isUpdateMinToken ||
			isUpdateTreasuryDNFT ||
			isUpdateDNFTLaunchPrice,
	};
};
