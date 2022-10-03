import { useMutation } from 'react-query';
import { message } from '@common/components';
import { axiosClient } from '@common/services/apiClient';
import { NftMintPhaseSetting } from '@settings/nft-mint/types';

const API = (id: string) => `/setting-mint/${id}`;
type Request = Omit<NftMintPhaseSetting, 'type'>;

const updateFn = async (rqBody: Request) => {
	const { _id, ...newSetting } = rqBody;
	return await axiosClient.put(API(_id), newSetting);
};

export const useUpdateNFTMintSetting = () => {
	const updateMutation = useMutation(updateFn, {
		onSuccess() {
			message.success('Update successful');
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
