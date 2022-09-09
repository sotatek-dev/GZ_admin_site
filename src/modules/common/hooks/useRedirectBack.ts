import { useNavigate } from 'react-router';

export const useRedirectBack = () => {
	const navigate = useNavigate();

	return () => navigate(-1);
};
