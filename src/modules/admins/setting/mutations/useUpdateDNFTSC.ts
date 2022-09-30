import { useMutation } from 'react-query';
import { MESSAGES } from '@common/constants/messages';
import { message } from '@common/components';
import { useDNFTContract } from '@web3/contracts/useDNFTContract';
export const useUpdateDNFTSC = () => {
	const dNFTContract = useDNFTContract();
	async function handleUpdateMinimumMintDNFTSC(key_mint_min_token: number) {
		try {
			if (!dNFTContract) return;
			const tx = await dNFTContract.setMinimumGalactixTokenRequire(
				key_mint_min_token
			);
			return await tx.wait().then(() => message.success(MESSAGES.MSC25));
		} catch (error) {
			message.error(MESSAGES.MSC26);
		}
	}
	async function handleUpdateRescurPriceDNFTSC(rescure_price: string) {
		try {
			if (!dNFTContract) return;
			const tx = await dNFTContract.setRescuePrice(rescure_price);
			return await tx.wait().then(() => message.success(MESSAGES.MSC25));
		} catch (error) {
			message.error(MESSAGES.MSC26);
		}
	}
	async function handleUpdateTreasuryAddressDNFTSC(treasury_address: string) {
		try {
			if (!dNFTContract) return;
			const tx = await dNFTContract.setTreasuryAddress(treasury_address);
			return await tx.wait().then(() => message.success(MESSAGES.MSC25));
		} catch (error) {
			message.error(MESSAGES.MSC26);
		}
	}
	async function handleUpdateLaunchPriceDNFTSC(launch_price: string) {
		try {
			if (!dNFTContract) return;
			const tx = await dNFTContract.setLaunchPrice(launch_price);
			return await tx.wait().then(() => message.success(MESSAGES.MSC25));
		} catch (error) {
			message.error(MESSAGES.MSC26);
		}
	}
	const { mutateAsync: updateRescurPriceDNFTSC } = useMutation(
		handleUpdateRescurPriceDNFTSC
	);
	const { mutateAsync: updateMinimumMintKeyDNFTSC } = useMutation(
		handleUpdateMinimumMintDNFTSC
	);
	const { mutateAsync: updateTreasuryAddressDNFTSC } = useMutation(
		handleUpdateTreasuryAddressDNFTSC
	);
	const { mutateAsync: updateLaunchPriceDNFTSC } = useMutation(
		handleUpdateLaunchPriceDNFTSC
	);
	return {
		updateRescurPriceDNFTSC,
		updateMinimumMintKeyDNFTSC,
		updateLaunchPriceDNFTSC,
		updateTreasuryAddressDNFTSC,
	};
};
