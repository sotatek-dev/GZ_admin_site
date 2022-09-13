import { PATHS } from '@common/constants/paths';
import { matchPath, useLocation } from 'react-router';

type MenuKey = string;
const MENUS: MenuKey[] = [
	PATHS.admins.list(),
	PATHS.saleRounds(),
	PATHS.settings.nftMint(),
	PATHS.settings.system(),
];

export const useActiveMenuKey = () => {
	const location = useLocation();

	const activeMenuKey = MENUS.filter((path) => {
		const match = matchPath(`${path}/*`, location.pathname);
		return !!match;
	});

	return activeMenuKey;
};
