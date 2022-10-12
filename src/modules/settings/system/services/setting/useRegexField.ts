import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { FieldCommon, price } from './useSubmitUpdate';
const useRegexField = ({
	fieldCommon,
	setFieldCommon,
}: {
	fieldCommon: FieldCommon<string>;
	setFieldCommon: Dispatch<SetStateAction<FieldCommon<string>>>;
}) => {
	const [statusDetectOnchange, setStatusDetectOnchange] =
		useState<boolean>(false);
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
							// Example int value = 11
							case priceTypeInt: {
								if (
									value.length <= maxLength &&
									parseFloat(value) <= price.max
								) {
									setFieldCommon({ ...fieldCommon, [type]: value });
								}
								break;
							}
							// Example float value = 11.1
							case priceTypeFloat: {
								if (
									spliceDot[indexAfterDot].length <= priceOnlyHaveOneDot &&
									spliceDot[indexBeforeDot].length <= maxLength &&
									value !== '.' &&
									parseFloat(spliceDot[indexBeforeDot]) <= price.max
								) {
									setFieldCommon({ ...fieldCommon, [type]: value });
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
	return {
		handleRegexField,
		statusDetectOnchange,
	};
};
export default useRegexField;
