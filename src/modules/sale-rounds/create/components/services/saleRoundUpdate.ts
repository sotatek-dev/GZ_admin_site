/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from '@common/components';
import { axiosClient } from '@common/services/apiClient';
import { useMutation } from 'react-query';

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
			const data = await createMutation.mutateAsync(payload);

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
			const data = await updateMutation.mutateAsync(newPayload);

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
