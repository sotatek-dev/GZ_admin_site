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
	const updateMutation = useMutation(updateFn);

	const updateNftMintSetting = async (rqBody: Request) => {
		try {
			const data = await updateMutation.mutateAsync(rqBody);
			message.success('Update successful');
			queryClient.invalidateQueries([API_GET_SETTING_MINT]);
			return data;
		} catch (error) {
			message.error('Update failed');
			return;
		}
	};

	return {
		updateNftMintSetting,
		isUpdateNftMintSetting: updateMutation.isLoading,
	};
};
