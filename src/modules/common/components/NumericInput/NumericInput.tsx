import { Input } from 'antd';
import { ReactNode } from 'react';

interface NumericInputProps {
	className?: string;
	disabled?: boolean;
	suffix?: ReactNode | string;
	addonAfter?: string;
	value: string;
	onChange: (value: string) => void;
}

export default function NumericInput(props: NumericInputProps) {
	const { value, onChange } = props;

	const formatThousands = (num: string) => {
		const values = num.split('.');
		return (
			values[0].replace(/.(?=(?:.{3})+$)/g, '$&,') +
			(values.length == 2 ? '.' + values[1] : '')
		);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value: inputValue } = e.target;
		const reg = /^\d{0,10}(\.\d{0,4})?$/;
		let temp = inputValue;
		temp = temp.replace(/,/g, '');

		if (reg.test(temp) || temp === '') {
			if (
				inputValue.charAt(inputValue.length - 1) === '.' ||
				inputValue.charAt(inputValue.length - 1) === '0'
			) {
				onChange(formatThousands(temp));
				return;
			}
			if (temp === '') {
				onChange('');
				return;
			}

			onChange(formatThousands(temp));
			return;
		}
		if (temp.length < 2) {
			const newValue = String(temp.match(reg) || '');
			onChange(formatThousands(newValue));
		}
	};

	// '.' at the end or only '-' in the input box.
	const handleBlur = () => {
		let valueTemp = value;
		if (!value) return;
		if (value.charAt(value.length - 1) === '.' || value === '-') {
			valueTemp = value.slice(0, -1);
		}
		onChange(
			formatThousands(valueTemp.replace(/,/g, '').replace(/0*(\d+)/, '$1'))
		);
	};

	return <Input {...props} onChange={handleChange} onBlur={handleBlur} />;
}
