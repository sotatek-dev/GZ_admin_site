import { useEffect } from 'react';
import { PATHS } from '@common/constants/paths';
import { useAuth } from '@common/hooks/useAuth';
import { useNavigate } from 'react-router';

export const useConnectedRedirect = () => {
	const { isAuth } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuth) {
			navigate(PATHS.admins.list());
		}
	}, [isAuth]);
};
