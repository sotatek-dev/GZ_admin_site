import { useMutation } from 'react-query';
import { axiosClient } from '@common/services/apiClient';
import { MintNFTUser } from '@settings/nft-mint/types';

const API = (id: string) => `/whitelisted-user/${id}`;

export type RQUpdateUser = Omit<MintNFTUser, '_id'>;
type Response = MintNFTUser;

async function updateFn(rqBody: MintNFTUser) {
	return await axiosClient.put<RQUpdateUser, Response>(API(rqBody._id), rqBody);
}

export const useUpdateWhitelistedUser = () => {
	const { mutate: updateWhitelistedUser } = useMutation(updateFn);
	return { updateWhitelistedUser };
};

async function deleteFn(_id: MintNFTUser['_id']) {
	return await axiosClient.delete<RQUpdateUser, Response>(API(_id));
}

export const useDeleteWhiteListedUser = () => {
	const { mutate: deleteWhiteListedUser } = useMutation(deleteFn);
	return { deleteWhiteListedUser };
};
