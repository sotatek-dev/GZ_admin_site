/**
 * Interact with SC, use `string` type instead others because React `key` type
 */
export enum MintPhase {
	WhiteList = '1',
	Presale1 = '2',
	Presale2 = '3',
	Launch = '4',
}

export const MinPhaseLabel = {
	[MintPhase.WhiteList]: 'WhiteList',
	[MintPhase.Presale1]: 'Presale1',
	[MintPhase.Presale2]: 'Presale2',
	[MintPhase.Launch]: 'Launch',
};

export interface NftMintPhaseSetting {
	_id: string;
	type: MintPhase;
	price: string;
	price_after_24h: string;
	nft_mint_limit: string;
	start_mint_time: number;
	end_mint_time: number;
}

export interface NFTInfoFormValue
	extends Pick<
		NftMintPhaseSetting,
		'price' | 'price_after_24h' | 'nft_mint_limit' | 'start_mint_time'
	> {
	mint_time: number[];
}

export interface MintNFTUser {
	_id: string;
	email: string;
	wallet_address: string;
}
