import { useEffect, useState, ChangeEvent } from 'react';
import { isAddress } from 'ethers/lib/utils';
import useSubmitUpdate, { price } from './useSubmitUpdate';
import useRegexField from './useRegexField';
import useInitialData from './useInitialData';
const useSetting = () => {
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
	const { initialData } = useInitialData({
		setIsLoadingSystemStatus,
		setInitialDataState,
		setTreasuryAddressCommon,
		setFieldCommon,
		reloadTime,
		fieldCommon,
		treasuryAddressCommon,
		initialDataState,
	});
	const [disableUpdateBtn, setDisableUpdateBtn] = useState<boolean>(true);
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
