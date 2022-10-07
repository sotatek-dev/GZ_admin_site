/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { message } from '@common/components';
import { axiosClient } from '@common/services/apiClient';
import { PageingWhiteList, DataTypePropsTable } from '../types';

export const APIsWhiteList = {
	getWhitelist: (id: string) => `/whitelisted-user/sale-round/${id}`,
	getWhiteUpdate: (id: string) => `/whitelisted-user/${id}`,
	getWhiteDelete: (id: string) => `/whitelisted-user/${id}`,
};

type Request = PageingWhiteList & { _id: string };

type Response = {
	list: DataTypePropsTable[];
	pagination: PageingWhiteList & {
		page_count: number;
		total: number;
	};
};

const fetcher = async (_id: string, payload: PageingWhiteList) => {
	return await axiosClient.get<Request, Response>(
		APIsWhiteList.getWhitelist(_id),
		{ params: payload }
	);
};

const updateFn = async (payload: DataTypePropsTable) => {
	return await axiosClient.put(
		APIsWhiteList.getWhiteUpdate(payload._id),
		payload
	);
};

const deleteFn = async (id: string) => {
	return await axiosClient.delete(APIsWhiteList.getWhiteDelete(id));
};

export const useSrWhiteListGet = (payload: PageingWhiteList, id?: string) => {
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

	const updateSrWhiteList = async (
		payload: DataTypePropsTable,
		_idSaleRound: string
	) => {
		try {
			const data = await updateMutation.mutateAsync(payload);
			await queryClient.refetchQueries([
				APIsWhiteList.getWhitelist(_idSaleRound),
			]);
			message.success('Update succeed');
			return data;
		} catch (error: any) {
			if (error?.response?.data?.message === 'ERROR_DUPLICATED') {
				message.error(
					`The address ${payload.wallet_address} already on the list, please enter another`
				);
				return;
			}
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
