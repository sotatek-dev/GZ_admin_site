export const PATHS = {
	profile: () => '/profile',
	connectWallet: () => '/connect-wallet',
	saleRounds: {
		list: () => '/sale-rounds',
		create: () => '/sale-rounds/create',
	},
	users: () => '/users',
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
