/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from '@common/components';
import { axiosClient } from '@common/services/apiClient';
import { useMutation } from 'react-query';
import { formatNumberPush } from './helper';

const APIs = {
	createSaleRound: () => '/sale-round',
	updateSaleRound: (id: string) => `/sale-round/${id}`,
	updateSaleRoundDeployed: (id: string) => `/sale-round/info/${id}`,
};
type Response = any;

async function createFn(payload: any) {
	return axiosClient.post<any, Response>(APIs.createSaleRound(), payload);
}

async function updateFnDeployed(payload: any) {
	return axiosClient.put<any, Response>(
		APIs.updateSaleRoundDeployed(payload._id),
		payload
	);
}

async function updateFn(payload: any) {
	return axiosClient.put<any, Response>(
		APIs.updateSaleRound(payload._id),
		payload
	);
}

export const useCreateSaleRound = () => {
	const createMutation = useMutation(createFn);

	const createSaleRound = async (payload: any) => {
		try {
			const newData = {
				...payload,
				details: {
					network: payload?.details?.network,
					buy_limit: formatNumberPush(payload?.details?.buy_limit),
				},
				exchange_rate: formatNumberPush(payload?.exchange_rate),
				token_info: {
					address: payload?.token_info?.address,
					total_sold_coin: formatNumberPush(
						payload?.token_info?.total_sold_coin
					),
				},
			};
			const data = await createMutation.mutateAsync(newData);

			message.success('Create succeed');
			return data;
		} catch (error) {
			message.error('Create failed');
			return;
		}
	};

	return {
		createSaleRound,
		isCreateSaleRound: createMutation.isLoading,
	};
};

export const useUpdateSaleRoundDeployed = () => {
	const updateMutation = useMutation(updateFnDeployed);

	const updateSaleRoundDeployed = async (newPayload: any) => {
		try {
			const data = await updateMutation.mutateAsync(newPayload);

			message.success('update succeed');
			return data;
		} catch (error) {
			message.error('update failed');
			return;
		}
	};

	return {
		updateSaleRoundDeployed,
		isCreateSaleRoundDeployed: updateMutation.isLoading,
	};
};

export const useUpdateSaleRound = () => {
	const updateMutation = useMutation(updateFn);

	const updateSaleRound = async (newPayload: any) => {
		try {
			const newData = {
				...newPayload,
				details: {
					network: newPayload?.details?.network,
					buy_limit: formatNumberPush(newPayload?.details?.buy_limit),
				},
				exchange_rate: formatNumberPush(newPayload?.exchange_rate),
				token_info: {
					address: newPayload?.token_info?.address,
					total_sold_coin: formatNumberPush(
						newPayload?.token_info?.total_sold_coin
					),
				},
			};

			const data = await updateMutation.mutateAsync(newData);

			message.success('update succeed');
			return data;
		} catch (error) {
			message.error('update failed');
			return;
		}
	};

	return {
		updateSaleRound,
		isCreateSaleRound: updateMutation.isLoading,
	};
};
