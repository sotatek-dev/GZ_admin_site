import './Button.style.scss';
import type { ButtonProps } from 'antd';
import { Button as AntButton } from 'antd';
import classNames from 'classnames';

export default function Button({ className, ...props }: ButtonProps) {
	const cln = classNames('app-button', className);

	return <AntButton type='primary' className={cln} {...props} />;
}
