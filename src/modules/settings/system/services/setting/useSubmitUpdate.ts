import { MESSAGES } from '@common/constants/messages';
import { message } from '@common/components';
import { useUpdateKeyNFTSC } from '@admins/setting/mutations/useUpdateKeyNFTSC';
import { useUpdateDNFTSC } from '@admins/setting/mutations/useUpdateDNFTSC';
import BigNumber from 'bignumber.js';
import { ContractReceipt } from 'ethers';
import { useState } from 'react';
import { useUpdateSystem } from '../useGetSystemSetting';
import { InitialDataProps } from './useInitialData';
export type FieldCommon<T> = {
	mint_days: T;
	key_mint_min_token: T;
	launch_price: T;
	rescure_price: T;
	key_price: T;
};
type PriceProps<T> = {
	min: T;
	mintKey: T;
	mintKeyDefault: T;
	max: T;
	fromBUSDToSC: T;
};
export type TreasuryProps = {
	statusAddressAfterRegex: boolean;
	treasury_address: string;
};
export const price: PriceProps<number> = {
	min: 0,
	mintKey: 5,
	mintKeyDefault: 1,
	max: 1000000000,
	fromBUSDToSC: 1e18,
};
const useSubmitUpdate = () => {
	const reloadTime = 500;
	const {
		updateRescurPriceDNFTSC,
		updateMinimumMintKeyDNFTSC,
		updateLaunchPriceDNFTSC,
		updateTreasuryAddressDNFTSC,
	} = useUpdateDNFTSC();
	const {
		updateLaunchPriceKeyNFTSC,
		updateTreasuryAddressKeyNFTSC,
		updatePriceKeyNFTSC,
	} = useUpdateKeyNFTSC();
	const { updateMintDaySystemAdmin, isLoadingSystem } = useUpdateSystem();
	const [isLoadingSystemStatus, setIsLoadingSystemStatus] =
		useState<boolean>(isLoadingSystem);
	const [fieldCommon, setFieldCommon] = useState<FieldCommon<string>>({
		mint_days: '0',
		key_mint_min_token: '0',
		launch_price: '0',
		rescure_price: '0',
		key_price: '0',
	});
	const [treasuryAddressCommon, setTreasuryAddressCommon] =
		useState<TreasuryProps>({
			statusAddressAfterRegex: false,
			treasury_address: '0',
		});
	const [initialDataState, setInitialDataState] = useState<
		InitialDataProps<string>
	>({
		mint_days: '',
		key_mint_min_token: '',
		launch_price: '',
		rescure_price: '',
		key_price: '',
		treasury_address: '',
	});
	const handleSubmit = async () => {
		const listPromiseFieldChange: Promise<ContractReceipt | undefined>[] = [];
		const objectMerge = Object.assign(fieldCommon, treasuryAddressCommon);
		const listKeys = Object.keys(objectMerge);
		listKeys?.length > 0 &&
			listKeys.forEach((item) => {
				switch (item) {
					case 'treasury_address': {
						if (objectMerge[item] !== initialDataState?.[item]) {
							listPromiseFieldChange.push(
								...listPromiseFieldChange,
								updateTreasuryAddressKeyNFTSC(objectMerge[item]),
								updateTreasuryAddressDNFTSC(objectMerge[item])
							);
						}
						break;
					}
					case 'key_price': {
						if (fieldCommon[item] !== initialDataState?.[item]) {
							listPromiseFieldChange.push(
								updatePriceKeyNFTSC(
									new BigNumber(fieldCommon[item])
										.times(price.fromBUSDToSC)
										.toString()
								)
							);
						}
						break;
					}
					case 'rescure_price': {
						if (fieldCommon[item] !== initialDataState?.[item]) {
							listPromiseFieldChange.push(
								updateRescurPriceDNFTSC(
									new BigNumber(fieldCommon[item])
										.times(price.fromBUSDToSC)
										.toString()
								)
							);
						}
						break;
					}
					case 'launch_price': {
						if (fieldCommon?.[item] !== initialDataState?.[item]) {
							listPromiseFieldChange.push(
								...listPromiseFieldChange,
								updateLaunchPriceDNFTSC(
									new BigNumber(fieldCommon[item])
										.times(price.fromBUSDToSC)
										.toString()
								),
								updateLaunchPriceKeyNFTSC(
									new BigNumber(fieldCommon[item])
										.times(price.fromBUSDToSC)
										.toString()
								)
							);
						}
						break;
					}
					case 'key_mint_min_token': {
						if (fieldCommon?.[item] !== initialDataState?.[item]) {
							listPromiseFieldChange.push(
								updateMinimumMintKeyDNFTSC(
									new BigNumber(parseFloat(fieldCommon[item]))
										.times(price.fromBUSDToSC)
										.toString()
								)
							);
						}
						break;
					}
					default:
						break;
				}
			});
		if (fieldCommon.mint_days !== initialDataState?.mint_days) {
			updateMintDaySystemAdmin({
				mint_days: parseFloat(fieldCommon.mint_days),
			});
		}
		if (listPromiseFieldChange.length > 0) {
			try {
				setIsLoadingSystemStatus(true);
				message.loading('Processing in progress', reloadTime);
				await Promise.any(listPromiseFieldChange);
				message.success(MESSAGES.MSC22);
			} catch (error) {
				message.error(MESSAGES.MSC26);
			} finally {
				setIsLoadingSystemStatus(false);
				setTimeout(() => {
					window.location.reload();
				}, reloadTime);
			}
		}
	};
	return {
		handleSubmit,
		setFieldCommon,
		setTreasuryAddressCommon,
		setInitialDataState,
		setIsLoadingSystemStatus,
		treasuryAddressCommon,
		initialDataState,
		isLoadingSystemStatus,
		reloadTime,
		fieldCommon,
	};
};
export default useSubmitUpdate;
