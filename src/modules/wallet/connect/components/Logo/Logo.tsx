import './Logo.style.scss';
import { Typography } from '@common/components';
import { AppLogo } from 'src/assets/icons';

const { Title } = Typography;

export default function Logo() {
	return (
		<Title level={2} className='app-logo'>
			<img src={AppLogo} alt='' width={82} height={79} />
		</Title>
	);
}
