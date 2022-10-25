import './CurrentAdmin.style.scss';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Skeleton, Typography } from '@common/components';
import { useGetProfile } from '@common/services/queries/useGetProfile';
import { PATHS } from '@common/constants/paths';
import { AdminRoleLabel } from '@common/constants/roles';

const { Text } = Typography;

export default function AdminLogo() {
	return (
		<Link to={PATHS.profile()}>
			<div className='sider-admin'>
				<div className='sider-admin-icon'>
					<UserOutlined style={{ fontSize: 24 }} />
				</div>
				<AdminName />
			</div>
		</Link>
	);
}

const AdminName = () => {
	const { data: profile, isLoading, isSuccess } = useGetProfile();

	if (isLoading) {
		return <Skeleton paragraph={{ rows: 1, width: '100%' }} />;
	}

	if (!isSuccess) {
		return null;
	}

	return (
		<Text ellipsis={{ tooltip: true }} style={{ maxWidth: '120px' }}>
			{profile?.full_name ?? AdminRoleLabel[profile.role]}
		</Text>
	);
};
