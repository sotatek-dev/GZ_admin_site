import React from 'react';
import { Navigate } from 'react-router';
import { PATHS } from '@common/constants/paths';
import { AdminRole } from '@common/constants/roles';
import { useAuth } from '@common/hooks';

interface Props {
	children: JSX.Element | null;
}

export const SAPrivateRoute = ({ children }: Props) => {
	const { admin } = useAuth();

	if (admin?.role !== AdminRole.SuperAdmin) {
		return <Navigate to={PATHS.notFound()} replace />;
	}

	return children;
};
