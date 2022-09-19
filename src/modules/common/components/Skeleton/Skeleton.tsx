import './Skeleton.style.scss';
import type { SkeletonProps } from 'antd';
import { Skeleton as AntdSkeleton } from 'antd';
import classNames from 'classnames';

export default function Skeleton({ className, ...props }: SkeletonProps) {
	const cln = classNames('app-skeleton', className);

	return <AntdSkeleton title={false} className={cln} {...props} />;
}
