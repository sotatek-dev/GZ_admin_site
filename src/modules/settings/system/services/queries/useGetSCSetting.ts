import { useDNFTContract } from '@web3/contracts/useDNFTContract';
import { useKeyNFTContract } from '@web3/contracts/useKeyNFTContract';
import BigNumber from 'bignumber.js';
import { formatEther } from 'ethers/lib/utils';
import { useQueries } from 'react-query';

export const querySCSettingKeys = {
	keyPrice: 'getKeyPrice',
	treasuryAddress: 'getTreasuryAddress',
	rescuePrice: 'getRescuePrice',
	minimumToken: 'getMinimumToken',
	minimumDnft: 'getMinDnftToMintKey',
	launchPrice: 'getLaunchPrice',
	buyTime: 'getMintKeyStartTime',
};

export const useGetSCSetting = () => {
	const keyNFTContract = useKeyNFTContract();
	const dNFTContract = useDNFTContract();

	async function getKeyPrice() {
		if (!keyNFTContract) return;
		const keyPrice = await keyNFTContract.keyPrice();
		return new BigNumber(formatEther(keyPrice));
	}

	async function getTreasuryAddress() {
		if (!keyNFTContract) return;
		return await keyNFTContract.treasuryAddress();
	}

	async function getRescuePrice() {
		if (!dNFTContract) return;
		const rescuePrice = await dNFTContract.rescuePrice();
		return new BigNumber(formatEther(rescuePrice));
	}

	async function getMinimumToken() {
		if (!dNFTContract) return;
		const minGXZTokenRequire = await dNFTContract.minimumGalactixTokenRequire();
		return new BigNumber(formatEther(minGXZTokenRequire));
	}

	async function getMintKeyStartTime() {
		if (!keyNFTContract) return;
		const buyTime = await keyNFTContract.buyTime();
		return buyTime.toNumber();
	}

	async function getMinDnftToMintKey() {
		if (!keyNFTContract) return;
		const minDnft = await keyNFTContract.minimumDNFTTokenRequire();

		return minDnft.toNumber();
	}

	const [
		{ data: keyPrice, isLoading: isGetKeyPrice },
		{ data: treasuryAddress, isLoading: isGetTreasuryAddress },
		{ data: rescuePrice, isLoading: isGetRescuePrice },
		{ data: minimumToken, isLoading: isGetMinimumToken },
		{ data: minimumDnft, isLoading: isGetMinimumDnft },
		{ data: mintKeyStartTime, isLoading: isGetMintKeyStartTime },
	] = useQueries([
		{ queryKey: querySCSettingKeys.keyPrice, queryFn: getKeyPrice },
		{
			queryKey: querySCSettingKeys.treasuryAddress,
			queryFn: getTreasuryAddress,
		},
		{ queryKey: querySCSettingKeys.rescuePrice, queryFn: getRescuePrice },
		{ queryKey: querySCSettingKeys.minimumToken, queryFn: getMinimumToken },
		{ queryKey: querySCSettingKeys.minimumDnft, queryFn: getMinDnftToMintKey },
		{ queryKey: querySCSettingKeys.buyTime, queryFn: getMintKeyStartTime },
	]);

	return {
		keyPrice,
		treasuryAddress,
		rescuePrice,
		minimumToken,
		minimumDnft,
		mintKeyStartTime,
		isGetSCSetting:
			isGetKeyPrice ||
			isGetTreasuryAddress ||
			isGetRescuePrice ||
			isGetMinimumToken ||
			isGetMinimumDnft ||
			isGetMintKeyStartTime,
	};
};
