import './ConnectButton.style.scss';
import { ButtonProps } from 'antd';
import { Button } from '@common/components';
import classNames from 'classnames';

type Props = ButtonProps;

export default function ConnectButton({ className, ...props }: Props) {
	const cln = classNames('wallet-button_connect', className);

	return <Button className={cln} {...props} />;
}
