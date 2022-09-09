import './DeleteButton.style.scss';
import type { ButtonProps } from 'antd';
import classNames from 'classnames';
import { Button } from '@common/components';

export default function DeleteButton({ className, ...props }: ButtonProps) {
	const cln = classNames('admin-delete-button', className);

	return <Button className={cln} {...props} />;
}
