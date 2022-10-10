import { Form } from '@common/components';
import { useEffect, useState, ChangeEvent, useCallback } from 'react';
import { MESSAGES } from '@common/constants/messages';
import { FieldData } from 'rc-field-form/es/interface';
import { message } from '@common/components';
import { useUpdateKeyNFTSC } from '@admins/setting/mutations/useUpdateKeyNFTSC';
import { useUpdateDNFTSC } from '@admins/setting/mutations/useUpdateDNFTSC';
import { UseQueryResult } from 'react-query';
import BigNumber from 'bignumber.js';
import { ContractReceipt } from 'ethers';
import { InitialProps } from '../type';
import { useGetSystemSetting, useUpdateSystem } from './useGetSystemSetting';
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
	const { data: initialData } = useGetSystemSetting() as UseQueryResult<
		InitialProps,
		unknown
	>;
	const [form] = Form.useForm();
	const reloadTime = 500;
	const [disableUpdateBtn, setDisableUpdateBtn] = useState<boolean>(true);
	const [fieldCommon, setFieldCommon] = useState<FieldCommon<string>>({
		mint_days: '0', // need number but right now is string
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
		// change any field then enable btn update
		setDisableUpdateBtn(false);
		const { value } = e.target;
		const regexCharacterExceptDot = /^[0-9\s.]+$/;
		if (value) {
			const spliceDot = value.split('.');
			const indexBeforeDot = 0;
			const indexAfterDot = 1;
			if (regexCharacterExceptDot.test(value)) {
				switch (spliceDot.length) {
					case 1: {
						if (value.length <= 10) {
							if (parseInt(value) <= price.max) {
								setFieldCommon({ ...fieldCommon, [type]: value });
							}
						}
						break;
					}
					case 2: {
						if (
							spliceDot[indexAfterDot].length <= 2 &&
							spliceDot[indexBeforeDot].length <= 10 &&
							value !== '.'
						) {
							if (parseInt(spliceDot[indexBeforeDot]) <= price.max) {
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
	const handleSubmit = async (values: { treasury_address: string }) => {
		const {
			key_mint_min_token,
			key_price,
			mint_days,
			rescure_price,
			launch_price,
		} = fieldCommon;
		if (
			key_mint_min_token !== '0' &&
			key_price !== '0' &&
			mint_days !== '0' &&
			rescure_price !== '0' &&
			launch_price !== '0'
		) {
			const listPromiseFieldChange: Promise<ContractReceipt | undefined>[] = [];
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const objectAfterMerge: any = { ...values, ...fieldCommon };
			console.log(objectAfterMerge);
			console.log(initialData);
			const listKeys = Object.keys(objectAfterMerge);
			listKeys?.length > 0 &&
				listKeys.forEach((item) => {
					switch (item) {
						case 'treasury_address': {
							if (objectAfterMerge[item] !== initialData?.[item]) {
								listPromiseFieldChange.push(
									...listPromiseFieldChange,
									updateTreasuryAddressKeyNFTSC(values[item]),
									updateTreasuryAddressDNFTSC(values[item])
								);
							}
							break;
						}
						case 'key_price': {
							if (parseInt(objectAfterMerge[item]) !== initialData?.[item]) {
								listPromiseFieldChange.push(
									updatePriceKeyNFTSC(
										new BigNumber(objectAfterMerge[item])
											.times(price.fromBUSDToSC)
											.toString()
									)
								);
							}
							break;
						}
						case 'rescure_price': {
							if (parseInt(objectAfterMerge[item]) !== initialData?.[item]) {
								listPromiseFieldChange.push(
									updateRescurPriceDNFTSC(
										new BigNumber(objectAfterMerge[item])
											.times(price.fromBUSDToSC)
											.toString()
									)
								);
							}
							break;
						}
						case 'launch_price': {
							if (
								parseInt(objectAfterMerge?.[item]) ||
								'' !== initialData?.[item] ||
								''
							) {
								listPromiseFieldChange.push(
									...listPromiseFieldChange,
									updateLaunchPriceDNFTSC(
										new BigNumber(objectAfterMerge[item])
											.times(price.fromBUSDToSC)
											.toString()
									),
									updateLaunchPriceKeyNFTSC(
										new BigNumber(objectAfterMerge[item])
											.times(price.fromBUSDToSC)
											.toString()
									)
								);
							}
							break;
						}
						case 'key_mint_min_token': {
							if (
								parseInt(objectAfterMerge?.[item]) ||
								'' !== initialData?.[item] ||
								''
							) {
								listPromiseFieldChange.push(
									updateMinimumMintKeyDNFTSC(objectAfterMerge[item])
								);
							}
							break;
						}
						default:
							break;
					}
				});
			updateMintDaySystemAdmin({
				mint_days: parseInt(objectAfterMerge.mint_days),
			});
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
		}
	};
	const handleFieldChange = useCallback(
		(_: FieldData[], allFields: FieldData[]) => {
			setDisableUpdateBtn(!allFields?.some((item) => item.value));
		},
		[]
	);
	const handleInitialForm = () => {
		form.setFieldsValue({ treasury_address: initialData?.treasury_address });
	};
	const handleInitialInput = () => {
		setFieldCommon({
			...fieldCommon,
			key_mint_min_token: String(initialData?.key_mint_min_token || 0) || '0',
			mint_days: String(initialData?.mint_days || 0) || '0',
			launch_price: String(initialData?.launch_price || 0) || '0',
			rescure_price: String(initialData?.rescure_price || 0) || '0',
			key_price: String(initialData?.key_price || 0) || '0',
		});
	};
	useEffect(() => {
		handleInitialForm();
		handleInitialInput();
	}, [initialData]);
	return {
		handleFieldChange,
		isLoadingSystemStatus,
		handleSubmit,
		disableUpdateBtn,
		price,
		handleRegexField,
		initialData,
		fieldCommon,
		form,
	};
};
export default useSetting;
