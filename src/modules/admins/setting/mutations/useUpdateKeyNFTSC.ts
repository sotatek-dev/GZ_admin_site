import { useMutation } from 'react-query';
import { useKeyNFTContract } from '@web3/contracts/useKeyNFTContract';
import { MESSAGES } from '@common/constants/messages';
import { message } from '@common/components';
export const useUpdateKeyNFTSC = () => {
	const keyNFTContract = useKeyNFTContract();
	async function handleUpdatePriceKeyNFTSC(key_price: string) {
		try {
			if (!keyNFTContract) return;
			const tx = await keyNFTContract.setKeyPrice(key_price);
			return await tx.wait().then(() => message.success(MESSAGES.MSC25));
		} catch (error) {
			message.error(MESSAGES.MSC26);
		}
	}
	async function handleUpdateTreasuryAddressKeyNFTSC(treasury_address: string) {
		try {
			if (!keyNFTContract) return;
			const tx = await keyNFTContract.setTreasuryAddress(treasury_address);
			return await tx.wait().then(() => message.success(MESSAGES.MSC25));
		} catch (error) {
			message.error(MESSAGES.MSC26);
		}
	}
	async function handleUpdateLaunchPriceKeyNFTSC(launch_price: string) {
		try {
			if (!keyNFTContract) return;
			const tx = await keyNFTContract.setLaunchPrice(launch_price);
			return await tx.wait().then(() => message.success(MESSAGES.MSC25));
		} catch (error) {
			message.error(MESSAGES.MSC26);
		}
	}
	const { mutateAsync: updatePriceKeyNFTSC } = useMutation(
		handleUpdatePriceKeyNFTSC
	);
	const { mutateAsync: updateTreasuryAddressKeyNFTSC } = useMutation(
		handleUpdateTreasuryAddressKeyNFTSC
	);
	const { mutateAsync: updateLaunchPriceKeyNFTSC } = useMutation(
		handleUpdateLaunchPriceKeyNFTSC
	);
	return {
		updateLaunchPriceKeyNFTSC,
		updateTreasuryAddressKeyNFTSC,
		updatePriceKeyNFTSC,
	};
};
