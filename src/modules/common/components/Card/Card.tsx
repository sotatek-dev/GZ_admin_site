import './Card.style.scss';
import type { CardProps } from 'antd';
import { Card as AntCard } from 'antd';
import classNames from 'classnames';

export default function Card({ className, ...props }: CardProps) {
	const cln = classNames('app-card', className);

	return <AntCard className={cln} {...props} />;
}
