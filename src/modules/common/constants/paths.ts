export const PATHS = {
	connectWallet: () => '/connect-wallet',
	saleRounds: () => '/sale-rounds',
	admins: {
		list: () => '/admins',
		edit: (id = ':id') => `/admins/edit/${id}`,
	},
	notFound: () => '/404',
};
