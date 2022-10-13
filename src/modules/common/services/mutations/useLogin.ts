import { Admin } from '@admins/common/types';
import { MESSAGES } from '@common/constants/messages';
import { AdminRole } from '@common/constants/roles';
import { setTokenCookie } from '@common/helpers/storage';
import { message } from 'antd';
import { useState } from 'react';
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
	role: AdminRole;
	status: string;
	created_at: string;
	updated_at: string;
	auth: {
		token: string;
		expire_in: number;
	};
};

export const useLogin = () => {
	const [admin, setAdmin] = useState<Admin>();

	const loginMutation = useMutation((rqBody: Request) => {
		return axiosClient.post<Request, Response>(APIs.login, rqBody);
	});

	const login = async (
		wallet_address: string,
		sign_message: string,
		signature: string
	) => {
		try {
			const {
				auth: { token },
				...admin
			} = await loginMutation.mutateAsync({
				wallet_address,
				sign_message,
				signature,
			});

			setTokenCookie(token);
			setAdmin(admin);
			return admin;
		} catch {
			message.error(MESSAGES.MC4);
		}
	};

	return { login, admin };
};
