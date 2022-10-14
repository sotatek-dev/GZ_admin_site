import React from 'react';
import { Navigate } from 'react-router';
import { PATHS } from '@common/constants/paths';
import { AdminRole } from '@common/constants/roles';
import { useAuth } from '@common/hooks';
import LoadingPage from '@common/components/Loading/LoadingPage';

interface Props {
	children: JSX.Element | null;
}

export const SAPrivateRoute = ({ children }: Props) => {
	const { admin, isAuthChecking } = useAuth();

	if (isAuthChecking) {
		return <LoadingPage />;
	}

	if (admin?.role !== AdminRole.SuperAdmin) {
		return <Navigate to={PATHS.notFound()} replace />;
	}

	return children;
};
