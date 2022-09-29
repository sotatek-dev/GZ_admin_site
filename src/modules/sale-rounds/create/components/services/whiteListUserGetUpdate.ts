/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { message } from '@common/components';
import { axiosClient } from '@common/services/apiClient';

export const APIsWhiteList = {
	getWhitelist: (id: string) => `/whitelisted-user/sale-round/${id}`,
	getWhiteUpdate: (id: string) => `/whitelisted-user/${id}`,
	getWhiteDelete: (id: string) => `/whitelisted-user/${id}`,
};

type Request = any;

type Response = any;

const fetcher = async (_id: Request, payload: any) => {
	return await axiosClient.get<Request, Response>(
		APIsWhiteList.getWhitelist(_id),
		{ params: payload }
	);
};

const updateFn = async (payload: any) => {
	return await axiosClient.put<Request, Response>(
		APIsWhiteList.getWhiteUpdate(payload.id),
		payload
	);
};

const deleteFn = async (id: string) => {
	return await axiosClient.delete<Request, Response>(
		APIsWhiteList.getWhiteDelete(id)
	);
};

export const useSrWhiteListGet = (id?: string, payload?: any) => {
	const saleroundId = id as string;
	return useQuery(
		[APIsWhiteList.getWhitelist(saleroundId), payload],
		() => fetcher(saleroundId, payload),
		{
			enabled: !!id,
		}
	);
};

export const useSrWhiteListUpdate = () => {
	const updateMutation = useMutation(updateFn);
	const queryClient = useQueryClient();

	const updateSrWhiteList = async (payload: any, _idSaleRound: string) => {
		try {
			const data = await updateMutation.mutateAsync(payload);
			await queryClient.refetchQueries([
				APIsWhiteList.getWhitelist(_idSaleRound),
			]);
			message.success('Update succeed');
			return data;
		} catch (error) {
			message.error('Update failed');
			return;
		}
	};

	return {
		updateSrWhiteList,
		isLoadingWhiteList: updateMutation.isLoading,
	};
};

export const useSrWhiteListDelete = () => {
	const deleteMutation = useMutation(deleteFn);
	const queryClient = useQueryClient();

	const deleteSrWhiteList = async (id: string, _idSaleRound: string) => {
		try {
			const data = await deleteMutation.mutateAsync(id);
			await queryClient.refetchQueries([
				APIsWhiteList.getWhitelist(_idSaleRound),
			]);
			message.success('Delete succeed');
			return data;
		} catch (error) {
			message.error('Delete failed');
			return;
		}
	};

	return {
		deleteSrWhiteList,
		isLoadingWhiteList: deleteMutation.isLoading,
	};
};
