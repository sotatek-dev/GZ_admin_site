export const PATHS = {
	connectWallet: () => '/connect-wallet',
	saleRounds: () => '/sale-rounds',
	admins: {
		list: () => '/admins',
		new: () => '/admins/new',
		edit: (id = ':id') => `/admins/edit/${id}`,
	},
	settings: {
		system: () => '/setting/system',
		nftMint: () => '/setting/nft-mint',
	},
	notFound: () => '/404',
};
