export const PATHS = {
	connectWallet: () => '/connect-wallet',
	saleRounds: () => '/sale-rounds',
	admins: {
		list: () => '/admins',
		new: () => '/admins/new',
		edit: (id = ':id') => `/admins/edit/${id}`,
	},
	settings: {
		nftMint: () => '/nft-mint',
	},
	notFound: () => '/404',
};
