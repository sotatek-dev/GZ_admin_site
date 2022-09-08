import './LoadingPage.style.scss';
import { Spin } from '@common/components';

export default function LoadingPage() {
	return (
		<div className='loading-page'>
			<Spin size='large' className='loading-spinner' />
		</div>
	);
}
