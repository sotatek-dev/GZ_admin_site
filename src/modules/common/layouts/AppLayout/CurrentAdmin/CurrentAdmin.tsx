import './CurrentAdmin.style.scss';
import { Typography } from '@common/components';

const { Text } = Typography;

export default function AdminLogo() {
	return (
		<div className='sider-admin'>
			<span className='sider-admin-icon' />
			<Text>Admin Username</Text>
		</div>
	);
}
