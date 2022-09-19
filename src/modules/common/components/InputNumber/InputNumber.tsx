import './InputNumber.style.scss';
import type { InputNumberProps } from 'antd';
import { InputNumber as AntdInputNumber } from 'antd';
import classNames from 'classnames';

export default function InputNumber({ className, ...props }: InputNumberProps) {
	return (
		<AntdInputNumber
			controls={false}
			className={classNames('app-input-number', className)}
			{...props}
		/>
	);
}
