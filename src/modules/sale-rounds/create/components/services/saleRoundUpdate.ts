/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from '@common/components';
import { axiosClient } from '@common/services/apiClient';
import { useMutation } from 'react-query';
import { formatNumberPush } from './helper';
import { ISaleRoundCreateForm } from '../types';

const APIs = {
	createSaleRound: () => '/sale-round',
	updateSaleRound: (id: string) => `/sale-round/${id}`,
	updateSaleRoundDeployed: (id: string) => `/sale-round/info/${id}`,
};
type Request = ISaleRoundCreateForm;

type Response = any;

async function createFn(payload: ISaleRoundCreateForm) {
	return axiosClient.post<Request, Response>(APIs.createSaleRound(), payload);
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

	const createSaleRound = async (payload: ISaleRoundCreateForm) => {
		if (!payload) return;
		try {
			const total_sold_coin = formatNumberPush(
				payload.token_info.total_sold_coin
			);

			const address = payload.token_info.address;
			const exchange_rate = formatNumberPush(payload.exchange_rate);
			const network = payload.details.network;
			const buy_limit = formatNumberPush(payload.details.buy_limit);

			const newData = {
				...payload,
				details: {
					network,
					buy_limit,
				},
				exchange_rate,
				token_info: {
					address,
					total_sold_coin,
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
			const total_sold_coin = formatNumberPush(
				newPayload?.token_info?.total_sold_coin
			);
			const address = newPayload?.token_info?.address;
			const exchange_rate = formatNumberPush(newPayload?.exchange_rate);
			const network = newPayload?.details?.network;
			const buy_limit = formatNumberPush(newPayload?.details?.buy_limit);
			const newData = {
				...newPayload,
				details: {
					network,
					buy_limit,
				},
				exchange_rate,
				token_info: {
					address,
					total_sold_coin,
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
