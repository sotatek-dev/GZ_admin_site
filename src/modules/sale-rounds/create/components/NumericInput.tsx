import { Input } from 'antd';

interface NumericInputProps {
	className: string;
	value: string;
	onChange: (value: string) => void;
}

const formatNumber = (value: number) =>
	String(new Intl.NumberFormat().format(value));

export default function NumericInput(props: NumericInputProps) {
	const { value, onChange } = props;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value: inputValue } = e.target;
		const reg = /^\d{0,10}(\.\d{0,2})?$/;
		let temp = inputValue;
		temp = temp.replace(/,/g, '');

		if (reg.test(temp) || temp === '') {
			if (inputValue.charAt(value.length) === '.') {
				onChange(inputValue);
				return;
			}
			if (temp === '') {
				onChange('');
				return;
			}
			onChange(formatNumber(Number(temp)));
		}
	};

	// '.' at the end or only '-' in the input box.
	const handleBlur = () => {
		let valueTemp = value;
		if (value.charAt(value.length - 1) === '.' || value === '-') {
			valueTemp = value.slice(0, -1);
		}
		onChange(valueTemp.replace(/0*(\d+)/, '$1'));
	};

	return <Input {...props} onChange={handleChange} onBlur={handleBlur} />;
}
