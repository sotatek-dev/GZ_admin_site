import { useMutation } from 'react-query';
import { message } from '@common/components';
import { axiosClient } from '@common/services/apiClient';
import { NftMintSetting } from '../types';

const APIs = {
	updateNftMintSetting: (id: string) => `/setting-mint/${id}`,
};

type Request = Omit<NftMintSetting, 'type' | 'end_mint_time'> & {
	end_mint_time: number | undefined;
};

type Response = NftMintSetting;

async function updateFn(rqBody: Request) {
	return axiosClient.put<Request, Response>(
		APIs.updateNftMintSetting(rqBody._id),
		rqBody
	);
}

export const useUpdateNFTMintSetting = () => {
	const updateMutation = useMutation(updateFn);

	const updateNftMintSetting = async (newSetting: Request) => {
		try {
			await updateMutation.mutateAsync(newSetting);
			message.success('Update succeed');
		} catch (error) {
			message.error('Update failed');
		}
	};

	return {
		updateNftMintSetting,
		isUpdateNftMintSetting: updateMutation.isLoading,
	};
};
