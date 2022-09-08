import React from 'react';
import { authContext } from '@common/contexts/authContext';

export const useAuth = () => {
	const context = React.useContext(authContext);
	if (!context) {
		throw new Error('useAuth must be used within a AuthProvider');
	}

	return context;
};
