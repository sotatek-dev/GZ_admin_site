import { useEffect, useState, ChangeEvent } from 'react';
import { MESSAGES } from '@common/constants/messages';
import { message } from '@common/components';
import { useUpdateKeyNFTSC } from '@admins/setting/mutations/useUpdateKeyNFTSC';
import { useUpdateDNFTSC } from '@admins/setting/mutations/useUpdateDNFTSC';
import { UseQueryResult } from 'react-query';
import BigNumber from 'bignumber.js';
import { InitialProps } from '../../type';
import { useGetSystemSetting } from '../useGetSystemSetting';
import { isAddress } from 'ethers/lib/utils';
import useSubmitUpdate, { price } from './useSubmitUpdate';
import useRegexField from './useRegexField';
const useSetting = () => {
	const get2NumberAfterDot = 2;
	const { data: initialData } = useGetSystemSetting() as UseQueryResult<
		InitialProps,
		unknown
	>;
	const { getRescuePrice, getMinimumToken, getLaunchPrice } = useUpdateDNFTSC();
	const { getKeyPrice, getTreasuryAddress } = useUpdateKeyNFTSC();
	const {
		handleSubmit,
		setFieldCommon,
		setInitialDataState,
		setIsLoadingSystemStatus,
		setTreasuryAddressCommon,
		treasuryAddressCommon,
		initialDataState,
		fieldCommon,
		reloadTime,
		isLoadingSystemStatus,
	} = useSubmitUpdate();
	const { handleRegexField, statusDetectOnchange } = useRegexField({
		fieldCommon,
		setFieldCommon,
	});
	const [disableUpdateBtn, setDisableUpdateBtn] = useState<boolean>(true);
	const handleConvertHexToDecimal = (priceData: string) => {
		return new BigNumber(
			new BigNumber(priceData)
				.div(price.fromBUSDToSC)
				.decimalPlaces(get2NumberAfterDot, BigNumber.ROUND_DOWN)
		).toFormat();
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
	const handleInitialData = async () => {
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
			setTimeout(() => {
				setIsLoadingSystemStatus(false);
			}, reloadTime);
		} catch (error) {
			message.error(MESSAGES.MSC26);
			setIsLoadingSystemStatus(false);
		}
	};
	useEffect(() => {
		handleInitialData();
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
		disableUpdateBtn,
		price,
		treasuryAddressCommon,
		initialData,
		fieldCommon,
		handleRegexAddress,
		handleSubmit,
		handleRegexField,
	};
};
export default useSetting;
