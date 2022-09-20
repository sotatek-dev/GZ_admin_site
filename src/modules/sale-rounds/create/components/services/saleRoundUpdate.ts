import { message } from '@common/components';
import { axiosClient } from '@common/services/apiClient';

export const createSaleRound = async (payload: any) => {
	await axiosClient
		.post('sale-round', payload)
		.then((data: any) => {
			console.log('createSaleRound', data);
		})
		.catch(() => message.error('err'));
};
