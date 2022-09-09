import './Loading.style.scss';
import { Spin } from '@common/components';

export default function LoadingPage() {
	return <Spin size='large' className='loading-spinner' />;
}
