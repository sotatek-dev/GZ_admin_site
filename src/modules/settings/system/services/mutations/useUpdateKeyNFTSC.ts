import { useMutation, useQueryClient } from 'react-query';
import { useKeyNFTContract } from '@web3/contracts/useKeyNFTContract';
import { querySCSettingKeys } from '../queries/useGetSCSetting';

export const useUpdateKeyDNFTSetting = () => {
	const queryClient = useQueryClient();
	const keyNFTContract = useKeyNFTContract();

	async function handleUpdatePriceKeyNFTSC(key_price: string) {
		if (!keyNFTContract) return;
		const tx = await keyNFTContract.setKeyPrice(key_price);
		return await tx.wait();
	}

	async function handleUpdateTreasuryAddressKeyNFTSC(treasury_address: string) {
		if (!keyNFTContract) return;
		const tx = await keyNFTContract.setTreasuryAddress(treasury_address);
		return await tx.wait();
	}

	async function handleUpdateMinDNFTRequired(min_dnft: string) {
		if (!keyNFTContract) return;
		const tx = await keyNFTContract.setMinimumDNFTTokenRequire(min_dnft);
		return await tx.wait();
	}

	async function handleUpdateStartBuyKeyTime(start_buy_time: number) {
		if (!keyNFTContract) return;
		const tx = await keyNFTContract.setBuyTime(start_buy_time);
		return await tx.wait();
	}

	const { mutateAsync: updatePriceKeyNFTSC, isLoading: isUpdateKeyPrice } =
		useMutation(handleUpdatePriceKeyNFTSC, {
			onSuccess() {
				return queryClient.invalidateQueries([querySCSettingKeys.keyPrice]);
			},
		});
	const {
		mutateAsync: updateTreasuryAddressKeyNFTSC,
		isLoading: isUpdateTreasuryKeyDNFT,
	} = useMutation(handleUpdateTreasuryAddressKeyNFTSC, {
		onSuccess() {
			return queryClient.invalidateQueries([
				querySCSettingKeys.treasuryAddress,
			]);
		},
	});
	const { mutateAsync: updateMinDNFTRequired, isLoading: isUpdateMinDNFT } =
		useMutation(handleUpdateMinDNFTRequired, {
			onSuccess() {
				return queryClient.invalidateQueries([querySCSettingKeys.minimumDnft]);
			},
		});
	const {
		mutateAsync: updateStartBuyKeyTime,
		isLoading: isUpdateStartBuyKeyTime,
	} = useMutation(handleUpdateStartBuyKeyTime, {
		onSuccess() {
			return queryClient.invalidateQueries([querySCSettingKeys.buyTime]);
		},
	});

	return {
		updateTreasuryAddressKeyNFTSC,
		updatePriceKeyNFTSC,
		updateMinDNFTRequired,
		updateStartBuyKeyTime,
		isUpdateKeyNFTSetting:
			isUpdateKeyPrice ||
			isUpdateTreasuryKeyDNFT ||
			isUpdateMinDNFT ||
			isUpdateStartBuyKeyTime,
	};
};
