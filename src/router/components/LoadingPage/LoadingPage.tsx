import React from 'react';
import { Spin } from '@common/components';

export default function LoadingPage() {
	return (
		<div className='absolute top-0 left-0 w-full h-full z-0'>
			<div className='relative h-full'>
				<span className='absolute top-1/2 left-1/2 -translate-x-[24px] -translate-y-[24px]'>
					<Spin />
				</span>
			</div>
		</div>
	);
}
