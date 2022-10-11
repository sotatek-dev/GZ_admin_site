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
		getRescuePrice,
		getMinimumToken,
		getLaunchPrice,
	} = useUpdateDNFTSC();
	const {
		updateLaunchPriceKeyNFTSC,
		updateTreasuryAddressKeyNFTSC,
		updatePriceKeyNFTSC,
		getKeyPrice,
		getTreasuryAddress,
	} = useUpdateKeyNFTSC();
	const { data: initialData, isLoading: isLoadingInitialData } =
		useGetSystemSetting() as UseQueryResult<InitialProps, unknown>;
	const reloadTime = 500;
	const [statusDetectOnchange, setStatusDetectOnchange] =
		useState<boolean>(false);
	const [treasuryAddressCommon, setTreasuryAddressCommon] = useState<{
		statusAddressAfterRegex: boolean;
		treasury_address: string;
	}>({
		statusAddressAfterRegex: false,
		treasury_address: '0',
	});
	const [initialDataState, setInitialDataState] = useState<{
		mint_days: string;
		key_mint_min_token: string;
		launch_price: string;
		rescure_price: string;
		key_price: string;
		treasury_address: string;
	}>({
		mint_days: '',
		key_mint_min_token: '',
		launch_price: '',
		rescure_price: '',
		key_price: '',
		treasury_address: '',
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
		// when onchange field will enable btn update except '.'
		value.charAt(value.length - 1) !== '.' && setStatusDetectOnchange(true);
		const regexCharacterExceptDot = /^[0-9\s.]+$/;
		const regexCharacter = /^[0-9\s]+$/;
		if (value) {
			switch (type) {
				case 'mint_days': {
					const minDay = 0,
						maxDay = 31;
					if (
						regexCharacter.test(value) &&
						parseInt(value) > minDay &&
						parseInt(value) <= maxDay
					) {
						setFieldCommon({ ...fieldCommon, mint_days: value });
					}
					break;
				}
				default: {
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
	const handleConvertHexToDecimal = (price: string) => {
		return new BigNumber(
			new BigNumber(price).div(1e18).decimalPlaces(2, BigNumber.ROUND_DOWN)
		).toFormat();
	};
	const handleInitialInput = async () => {
		const indexRescurPrice = 0,
			indexMinimumToken = 1,
			indexLaunchPrice = 2,
			indexKeyPrice = 3,
			indexTreasuryAddress = 4;
		try {
			setIsLoadingSystemStatus(true);
			const res = await Promise.all([
				getRescuePrice(),
				getMinimumToken(),
				getLaunchPrice(),
				getKeyPrice(),
				getTreasuryAddress(),
			]);
			const key_mint_min_token = String(
				handleConvertHexToDecimal(res[indexMinimumToken]?._hex || '0')
			);
			const launch_price = String(
				handleConvertHexToDecimal(res[indexLaunchPrice]?._hex || '0')
			);
			const mint_days = String(initialData?.mint_days || 0) || '0';
			const rescure_price = String(
				handleConvertHexToDecimal(res[indexRescurPrice]?._hex || '0')
			);
			const key_price = String(
				handleConvertHexToDecimal(res[indexKeyPrice]?._hex || '0')
			);
			const treasury_address = res?.[indexTreasuryAddress] || '';
			setInitialDataState({
				...initialDataState,
				key_mint_min_token,
				mint_days,
				launch_price,
				rescure_price,
				key_price,
				treasury_address,
			});
			setTreasuryAddressCommon({
				...treasuryAddressCommon,
				treasury_address,
			});
			setFieldCommon({
				...fieldCommon,
				key_mint_min_token,
				mint_days,
				launch_price,
				rescure_price,
				key_price,
			});
			setIsLoadingSystemStatus(false);
		} catch (error) {
			setIsLoadingSystemStatus(false);
		}
	};
	const handleRegexAddress = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		// when onchange field will enable btn update except '.'
		value.charAt(value.length - 1) !== '.' &&
			setDisableUpdateBtn(!isAddress(value));
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
		if (statusDetectOnchange) {
			const listValues = Object.values(fieldCommon);
			const statusDisableBtn = !listValues.every(
				(item) => parseFloat(item) > 0
			);
			statusDisableBtn !== disableUpdateBtn &&
				isAddress(treasuryAddressCommon.treasury_address) &&
				setDisableUpdateBtn(statusDisableBtn);
		}
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
