import { useMutation, useQueryClient } from 'react-query';
import { useDNFTContract } from '@web3/contracts/useDNFTContract';
import { querySCSettingKeys } from '../queries/useGetSCSetting';

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

	return {
		updateRescurPriceDNFTSC,
		updateMinTokenMintKeySC,
		updateTreasuryAddressDNFTSC,
		isUpdateDNFTSetting:
			isUpdateRescuePrice || isUpdateMinToken || isUpdateTreasuryDNFT,
	};
};
