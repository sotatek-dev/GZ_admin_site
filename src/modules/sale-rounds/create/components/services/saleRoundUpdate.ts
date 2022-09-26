/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from '@common/components';
import { axiosClient } from '@common/services/apiClient';
import { useMutation } from 'react-query';

const APIs = {
	createSaleRound: () => '/sale-round',
};
type Response = any;

async function createFn(payload: any) {
	return axiosClient.put<any, Response>(APIs.createSaleRound(), payload);
}
export const useCreateSaleRound = () => {
	const createMutation = useMutation(createFn);

	const createSaleRound = async (payload: any) => {
		try {
			await createMutation.mutateAsync(payload);
			message.success('Create succeed');
		} catch (error) {
			message.error('Create failed');
		}
	};

	return {
		createSaleRound,
		isUpdateNftMintSetting: createMutation.isLoading,
	};
};
