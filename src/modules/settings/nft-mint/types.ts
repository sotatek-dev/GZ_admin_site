export enum MintPhase {
	WhiteList = '1',
	Presale1 = '2',
	Presale2 = '3',
	Public = '4',
}

export const MinPhaseLabel = {
	[MintPhase.WhiteList]: 'WhiteList',
	[MintPhase.Presale1]: 'Presale1',
	[MintPhase.Presale2]: 'Presale2',
	[MintPhase.Public]: 'Public',
};

export interface NftMintSetting {
	_id: string;
	type: MintPhase;
	price: number;
	price_after_24h: number;
	nft_mint_limit: number;
	start_mint_time: number;
	end_mint_time: number;
}

export interface NFTInfoFormValue
	extends Pick<
		NftMintSetting,
		'price' | 'price_after_24h' | 'nft_mint_limit' | 'start_mint_time'
	> {
	mint_time: number[];
}
