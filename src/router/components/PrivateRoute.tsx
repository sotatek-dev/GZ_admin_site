import React from 'react';
import { Navigate } from 'react-router';
import { PATHS } from '@common/constants/paths';
import { useAuth } from '@common/hooks/useAuth';
import LoadingPage from './LoadingPage';

interface Props {
	children: JSX.Element | null;
}

export const PrivateRoute = ({ children }: Props) => {
	const { isAuthChecking, isAuth } = useAuth();

	if (isAuthChecking) {
		return <LoadingPage />;
	}

	if (!isAuth) {
		return (
			<Navigate
				to={PATHS.connectWallet()}
				state={{ returnUrl: location.pathname }}
			/>
		);
	}

	return children;
};
