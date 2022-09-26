import { message } from '@common/components';
import { axiosClient } from '@common/services/apiClient';

// API pendding api
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSaleRound = async (payload: any) => {
	await axiosClient
		.post('sale-round', payload)
		.then(() => {})
		.catch(() => message.error('err'));
};
