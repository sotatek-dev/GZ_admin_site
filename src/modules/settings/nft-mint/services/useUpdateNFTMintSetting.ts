import { useMutation } from 'react-query';
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
		await updateMutation.mutateAsync(newSetting);
	};

	return {
		updateNftMintSetting,
		isUpdateNftMintSetting: updateMutation.isLoading,
	};
};
