import { useMutation } from 'react-query';
import { useKeyNFTContract } from '@web3/contracts/useKeyNFTContract';
export const useUpdateKeyNFTSC = () => {
	const keyNFTContract = useKeyNFTContract();
	async function getKeyPrice() {
		if (!keyNFTContract) return;
		return await keyNFTContract.keyPrice();
	}
	async function getTreasuryAddress() {
		if (!keyNFTContract) return;
		return await keyNFTContract.treasuryAddress();
	}
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
	async function handleUpdateLaunchPriceKeyNFTSC(launch_price: string) {
		if (!keyNFTContract) return;
		const tx = await keyNFTContract.setLaunchPrice(launch_price);
		return await tx.wait();
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
		// set
		updateLaunchPriceKeyNFTSC,
		updateTreasuryAddressKeyNFTSC,
		updatePriceKeyNFTSC,
		// get
		getKeyPrice,
		getTreasuryAddress,
	};
};
