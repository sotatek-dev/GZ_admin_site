import { useMutation } from 'react-query';
import { useDNFTContract } from '@web3/contracts/useDNFTContract';
import { MintPhase } from '@settings/nft-mint/types';
import { message } from '@common/components';

export const useSetCurrentRound = () => {
	const dNFTContract = useDNFTContract();

	const setCurrentRound = async (phase: MintPhase) => {
		if (!dNFTContract) return;
		return await dNFTContract.setCurrentSalePhase(phase);
	};

	const updateMutation = useMutation(setCurrentRound, {
		onSuccess() {
			message.success('Update successful');
		},
		onError() {
			message.error('Update failed');
		},
	});

	return {
		setCurrentRound: updateMutation.mutate,
		isSetCurrentRound: updateMutation.isLoading,
	};
};
