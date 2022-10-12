import { Dispatch, SetStateAction, useEffect } from 'react';
import { MESSAGES } from '@common/constants/messages';
import { message } from '@common/components';
import { UseQueryResult } from 'react-query';
import BigNumber from 'bignumber.js';
import { useGetSystemSetting } from '../useGetSystemSetting';
import { FieldCommon, price, TreasuryProps } from './useSubmitUpdate';
import { useUpdateDNFTSC } from '@admins/setting/mutations/useUpdateDNFTSC';
import { useUpdateKeyNFTSC } from '@admins/setting/mutations/useUpdateKeyNFTSC';
import { InitialProps } from '@settings/system/type';
export type InitialDataProps<T> = {
	mint_days: T;
	key_mint_min_token: T;
	launch_price: T;
	rescure_price: T;
	key_price: T;
	treasury_address: T;
};
type UseInitialDataProps = {
	setIsLoadingSystemStatus: Dispatch<SetStateAction<boolean>>;
	setInitialDataState: Dispatch<SetStateAction<InitialDataProps<string>>>;
	setTreasuryAddressCommon: Dispatch<SetStateAction<TreasuryProps>>;
	setFieldCommon: Dispatch<SetStateAction<FieldCommon<string>>>;
	treasuryAddressCommon: TreasuryProps;
	reloadTime: number;
	fieldCommon: FieldCommon<string>;
	initialDataState: InitialDataProps<string>;
};
const useInitialData = ({
	setIsLoadingSystemStatus,
	setInitialDataState,
	setTreasuryAddressCommon,
	setFieldCommon,
	reloadTime,
	fieldCommon,
	treasuryAddressCommon,
	initialDataState,
}: UseInitialDataProps) => {
	const get2NumberAfterDot = 2;
	const { getRescuePrice, getMinimumToken, getLaunchPrice } = useUpdateDNFTSC();
	const { getKeyPrice, getTreasuryAddress } = useUpdateKeyNFTSC();
	const { data: initialData } = useGetSystemSetting() as UseQueryResult<
		InitialProps,
		unknown
	>;
	const handleConvertHexToDecimal = (priceData: string) => {
		return new BigNumber(
			new BigNumber(priceData)
				.div(price.fromBUSDToSC)
				.decimalPlaces(get2NumberAfterDot, BigNumber.ROUND_DOWN)
		).toFormat();
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
	return {
		initialData,
	};
};
export default useInitialData;
