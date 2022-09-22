import './CurrentAdmin.style.scss';
import { Skeleton, Typography } from '@common/components';
import { useGetProfile } from '@common/services/queries/useGetProfile';
import { Link } from 'react-router-dom';
import { PATHS } from '@common/constants/paths';

const { Text } = Typography;

export default function AdminLogo() {
	const { data: profile, isLoading } = useGetProfile();

	return (
		<div className='sider-admin'>
			<span className='sider-admin-icon' />

			{isLoading ? (
				<Skeleton paragraph={{ rows: 1, width: '100%' }} />
			) : (
				<Link to={PATHS.profile()}>
					<Text ellipsis={{ tooltip: true }}>
						{profile?.full_name ?? 'Admin'}
					</Text>
				</Link>
			)}
		</div>
	);
}
