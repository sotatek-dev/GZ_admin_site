import { setTokenCookie } from '@common/helpers/storage';
import { useMutation } from 'react-query';
import { axiosClient } from '../apiClient';

const APIs = {
	login: '/admin/auth',
};

type Request = {
	wallet_address: string;
	sign_message: string;
	signature: string;
};

type Response = {
	_id: string;
	wallet_address: string;
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	role: string;
	status: string;
	created_at: string;
	updated_at: string;
	auth: {
		token: string;
		expire_in: number;
	};
};

export const useLogin = () => {
	const loginMutation = useMutation((rqBody: Request) => {
		return axiosClient.post<Request, Response>(APIs.login, rqBody);
	});

	const login = async (
		wallet_address: string,
		sign_message: string,
		signature: string
	) => {
		const {
			auth: { token },
		} = await loginMutation.mutateAsync({
			wallet_address,
			sign_message,
			signature,
		});

		setTokenCookie(token);
	};

	return { login };
};
