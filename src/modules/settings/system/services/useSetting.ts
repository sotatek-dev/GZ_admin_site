import { Form } from '@common/components';
import { useCallback, useEffect, useState } from 'react';
import { FieldData } from 'rc-field-form/es/interface';
import { MESSAGES } from '@common/constants/messages';
import { message } from '@common/components';
import { useUpdateKeyNFTSC } from '@admins/setting/mutations/useUpdateKeyNFTSC';
import { useUpdateDNFTSC } from '@admins/setting/mutations/useUpdateDNFTSC';
import { UseQueryResult } from 'react-query';
import BigNumber from 'bignumber.js';
import { ContractReceipt } from 'ethers';
import { InitialProps, SubmitProps } from '../type';
import { useGetSystemSetting, useUpdateSystem } from './useGetSystemSetting';
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
	const [disableUpdateBtn, setDisableUpdateBtn] = useState<boolean>(true);
	const { data: initialData } = useGetSystemSetting() as UseQueryResult<
		InitialProps,
		unknown
	>;
	const [form] = Form.useForm();
	const reloadTime = 500;

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
	const handleFieldChange = useCallback(
		(_: FieldData[], allFields: FieldData[]) => {
			setDisableUpdateBtn(!allFields?.some((item) => item.value));
		},
		[]
	);
	const handleSubmit = async (values: SubmitProps<number>) => {
		const listPromiseFieldChange: Promise<ContractReceipt | undefined>[] = [];
		const listKeys = Object.keys(values);
		listKeys?.length > 0 &&
			listKeys.forEach((item) => {
				switch (item) {
					case 'treasury_address': {
						if (values[item] !== initialData?.[item]) {
							listPromiseFieldChange.push(
								...listPromiseFieldChange,
								updateTreasuryAddressKeyNFTSC(values[item]),
								updateTreasuryAddressDNFTSC(values[item])
							);
						}
						break;
					}
					case 'key_price': {
						if (values[item] !== initialData?.[item]) {
							listPromiseFieldChange.push(
								updatePriceKeyNFTSC(
									new BigNumber(values[item])
										.times(price.fromBUSDToSC)
										.toString()
								)
							);
						}
						break;
					}
					case 'rescure_price': {
						if (values[item] !== initialData?.[item]) {
							listPromiseFieldChange.push(
								updateRescurPriceDNFTSC(
									new BigNumber(values[item])
										.times(price.fromBUSDToSC)
										.toString()
								)
							);
						}
						break;
					}
					case 'launch_price': {
						if (values?.[item] || '' !== initialData?.[item] || '') {
							listPromiseFieldChange.push(
								...listPromiseFieldChange,
								updateLaunchPriceDNFTSC(
									new BigNumber(values[item])
										.times(price.fromBUSDToSC)
										.toString()
								),
								updateLaunchPriceKeyNFTSC(
									new BigNumber(values[item])
										.times(price.fromBUSDToSC)
										.toString()
								)
							);
						}
						break;
					}
					case 'key_mint_min_token': {
						if (values?.[item] || '' !== initialData?.[item] || '') {
							listPromiseFieldChange.push(
								updateMinimumMintKeyDNFTSC(values[item])
							);
						}
						break;
					}
					default:
						break;
				}
			});
		updateMintDaySystemAdmin({
			mint_days: values.mint_days,
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
	};
	const handleInitialForm = () => {
		form.setFieldsValue({ ...initialData });
	};
	useEffect(() => {
		handleInitialForm();
	}, [initialData]);

	return {
		disableUpdateBtn,
		handleFieldChange,
		isLoadingSystemStatus,
		handleSubmit,
		price,
		form,
	};
};
export default useSetting;
