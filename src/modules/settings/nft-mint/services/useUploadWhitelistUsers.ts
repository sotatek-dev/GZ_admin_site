import { useMutation, useQueryClient } from 'react-query';
import { MintPhase } from '@settings/nft-mint/types';
import { message } from '@common/components';
import { BE_MintPhase } from '../SettingMintNFT.constant';
import { axiosClient } from '@common/services/apiClient';

const API = (phase: MintPhase) =>
	`/whitelisted-user/mint-nft/${BE_MintPhase[phase]}`;

interface RQ {
	phase: MintPhase;
	file: File;
}

const uploadWhitelistUsers = async (rqBody: RQ) => {
	const data = new FormData();
	data.append('file', rqBody.file);

	return await axiosClient.post(API(rqBody.phase), data, {
		headers: {
			ContentType: 'multipart/form-data',
		},
	});
};

export const useUploadWhitelistUsers = () => {
	const queryClient = useQueryClient();

	const updateMutation = useMutation(uploadWhitelistUsers, {
		onSuccess() {
			message.success('Update successful');
			return queryClient.invalidateQueries(['getNFTSettingUsers']);
		},
		onError() {
			message.error('Update failed');
		},
	});

	return {
		uploadWhitelistUser: updateMutation.mutate,
		isUploading: updateMutation.isLoading,
	};
};
