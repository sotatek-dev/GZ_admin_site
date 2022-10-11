import { useEffect, useState, ChangeEvent } from 'react';
import { MESSAGES } from '@common/constants/messages';
import { message } from '@common/components';
import { useUpdateKeyNFTSC } from '@admins/setting/mutations/useUpdateKeyNFTSC';
import { useUpdateDNFTSC } from '@admins/setting/mutations/useUpdateDNFTSC';
import { UseQueryResult } from 'react-query';
import BigNumber from 'bignumber.js';
import { ContractReceipt } from 'ethers';
import { InitialProps } from '../type';
import { useGetSystemSetting, useUpdateSystem } from './useGetSystemSetting';
import { isAddress } from 'ethers/lib/utils';
type FieldCommon<T> = {
	mint_days: T;
	key_mint_min_token: T;
	launch_price: T;
	rescure_price: T;
	key_price: T;
};
const useSetting = () => {
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
	const { data: initialData, isLoading: isLoadingInitialData } =
		useGetSystemSetting() as UseQueryResult<InitialProps, unknown>;
	const reloadTime = 500;
	const [treasuryAddressCommon, setTreasuryAddressCommon] = useState<{
		statusAddressAfterRegex: boolean;
		treasury_address: string;
	}>({
		statusAddressAfterRegex: false,
		treasury_address: '0',
	});
	const [disableUpdateBtn, setDisableUpdateBtn] = useState<boolean>(true);
	const [fieldCommon, setFieldCommon] = useState<FieldCommon<string>>({
		mint_days: '0',
		key_mint_min_token: '0',
		launch_price: '0',
		rescure_price: '0',
		key_price: '0',
	});
	const price: {
		min: number;
		mintKey: number;
		mintKeyDefault: number;
		max: number;
		fromBUSDToSC: number;
	} = {
		min: 0,
		mintKey: 5,
		mintKeyDefault: 1,
		max: 1000000000,
		fromBUSDToSC: 1e18,
	};
	const { updateMintDaySystemAdmin, isLoadingSystem } = useUpdateSystem();
	const [isLoadingSystemStatus, setIsLoadingSystemStatus] =
		useState<boolean>(isLoadingSystem);
	const handleRegexField = (
		e: ChangeEvent<HTMLInputElement>,
		type:
			| 'mint_days'
			| 'key_mint_min_token'
			| 'launch_price'
			| 'rescure_price'
			| 'key_price'
	) => {
		const { value } = e.target;
		const regexCharacterExceptDot = /^[0-9\s.]+$/;
		if (value) {
			const spliceDot = value.split('.');
			const indexBeforeDot = 0,
				indexAfterDot = 1,
				priceTypeInt = 1,
				priceTypeFloat = 2,
				maxLength = 10,
				priceOnlyHaveOneDot = 2;
			if (regexCharacterExceptDot.test(value)) {
				switch (spliceDot.length) {
					case priceTypeInt: {
						if (value.length <= maxLength) {
							if (parseFloat(value) <= price.max) {
								setFieldCommon({ ...fieldCommon, [type]: value });
							}
						}
						break;
					}
					case priceTypeFloat: {
						if (
							spliceDot[indexAfterDot].length <= priceOnlyHaveOneDot &&
							spliceDot[indexBeforeDot].length <= maxLength &&
							value !== '.'
						) {
							if (parseFloat(spliceDot[indexBeforeDot]) <= price.max) {
								// // change any field then enable btn update
								// spliceDot[indexAfterDot] && setDisableUpdateBtn(false);
								setFieldCommon({ ...fieldCommon, [type]: value });
							}
						}
						break;
					}
					default:
						'';
				}
			}
		} else {
			setFieldCommon({ ...fieldCommon, [type]: '' });
		}
	};
	const handleSubmit = async () => {
		const listPromiseFieldChange: Promise<ContractReceipt | undefined>[] = [];
		const objectMerge = { ...fieldCommon, ...treasuryAddressCommon };
		const listKeys = Object.keys(objectMerge);
		listKeys?.length > 0 &&
			listKeys.forEach((item) => {
				switch (item) {
					case 'treasury_address': {
						if (objectMerge[item] !== initialData?.[item]) {
							listPromiseFieldChange.push(
								...listPromiseFieldChange,
								updateTreasuryAddressKeyNFTSC(objectMerge[item]),
								updateTreasuryAddressDNFTSC(objectMerge[item])
							);
						}
						break;
					}
					case 'key_price': {
						if (parseFloat(fieldCommon[item]) !== initialData?.[item]) {
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
						if (parseFloat(fieldCommon[item]) !== initialData?.[item]) {
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
						if (
							parseFloat(fieldCommon?.[item]) ||
							'' !== initialData?.[item] ||
							''
						) {
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
						if (
							parseFloat(fieldCommon?.[item]) ||
							'' !== initialData?.[item] ||
							''
						) {
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
		if (parseFloat(fieldCommon.mint_days) !== initialData?.mint_days) {
			updateMintDaySystemAdmin({
				mint_days: parseFloat(fieldCommon.mint_days),
			});
		}
		try {
			setIsLoadingSystemStatus(true);
			message.loading('Processing in progress', reloadTime);
			await Promise.any(listPromiseFieldChange);
			message.success(MESSAGES.MSC25);
		} catch (error) {
			message.error(MESSAGES.MSC26);
		} finally {
			setIsLoadingSystemStatus(false);
			setTimeout(() => {
				window.location.reload();
			}, reloadTime);
		}
	};
	const handleInitialInput = () => {
		setTreasuryAddressCommon({
			...treasuryAddressCommon,
			treasury_address: String(initialData?.treasury_address || 0) || '0',
		});
		setFieldCommon({
			...fieldCommon,
			key_mint_min_token: String(initialData?.key_mint_min_token || 0) || '0',
			mint_days: String(initialData?.mint_days || 0) || '0',
			launch_price: String(initialData?.launch_price || 0) || '0',
			rescure_price: String(initialData?.rescure_price || 0) || '0',
			key_price: String(initialData?.key_price || 0) || '0',
		});
	};
	const handleRegexAddress = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setTreasuryAddressCommon({
			...treasuryAddressCommon,
			treasury_address: value,
			statusAddressAfterRegex: !isAddress(value),
		});
	};
	useEffect(() => {
		handleInitialInput();
	}, [initialData]);
	useEffect(() => {
		const listValues = Object.values(fieldCommon);
		const statusDisableBtn = !listValues.every((item) => parseFloat(item) > 0);
		statusDisableBtn !== disableUpdateBtn &&
			setDisableUpdateBtn(statusDisableBtn);
	}, [fieldCommon]);
	return {
		isLoadingSystemStatus,
		handleSubmit,
		disableUpdateBtn,
		price,
		handleRegexAddress,
		isLoadingInitialData,
		treasuryAddressCommon,
		handleRegexField,
		initialData,
		fieldCommon,
	};
};
export default useSetting;
