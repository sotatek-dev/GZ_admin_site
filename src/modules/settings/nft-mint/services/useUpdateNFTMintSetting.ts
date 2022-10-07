import { useMutation, useQueryClient } from 'react-query';
import { message } from '@common/components';
import { axiosClient } from '@common/services/apiClient';
import { NftMintPhaseSetting } from '@settings/nft-mint/types';
import { API_GET_SETTING_MINT } from './useGetSettingNFTMint';

const API = (id: string) => `/setting-mint/${id}`;
type Request = Omit<NftMintPhaseSetting, 'type'>;

const updateFn = async (rqBody: Request) => {
	const { _id, ...newSetting } = rqBody;
	return await axiosClient.put(API(_id), newSetting);
};

export const useUpdateNFTMintSetting = () => {
	const queryClient = useQueryClient();

	const updateMutation = useMutation(updateFn, {
		onSuccess() {
			message.success('Update successful');
			return queryClient.invalidateQueries([API_GET_SETTING_MINT]);
		},
		onError() {
			message.error('Update failed');
		},
	});

	return {
		updateNftMintSetting: updateMutation.mutate,
		isUpdateNftMintSetting: updateMutation.isLoading,
	};
};
