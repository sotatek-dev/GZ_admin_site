import './Logo.style.scss';
import { Typography } from '@common/components';

const { Title } = Typography;

export default function Logo() {
	return (
		<Title level={2} className='app-logo'>
			Logo
		</Title>
	);
}
