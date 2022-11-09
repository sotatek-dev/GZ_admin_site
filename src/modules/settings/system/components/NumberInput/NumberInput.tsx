import { useState } from 'react';
import { Input } from '@common/components';

interface NumberInputProps {
	value?: string | number;
	onChange?: (value?: string) => void;
	validator?: Array<(val?: string) => boolean>;
	suffix?: React.ReactNode;
}

const NumberInput = ({
	value,
	onChange,
	validator,
	suffix,
}: NumberInputProps) => {
	const [number, setNumber] = useState<string>((value || '').toString());

	const triggerChange = (changedValue: string) => {
		onChange?.(changedValue);
	};

	const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;

		let validators = [decimalValidator];
		if (validator) {
			validators = [...validators, ...validator];
		}

		if (validators.some((isValid) => !isValid(newValue))) {
			return;
		}

		setNumber(newValue);
		triggerChange(newValue);
	};

	return (
		<span>
			<Input
				type='text'
				value={value ?? number}
				onChange={onNumberChange}
				suffix={suffix}
			/>
		</span>
	);
};

export default NumberInput;

const DECIMAL_PLACES_REGEX = /^$|^\d{1,10}(\.\d{0,4})?$/;

const decimalValidator = (val: string) => {
	return DECIMAL_PLACES_REGEX.test(val);
};
