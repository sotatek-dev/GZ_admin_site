import { PATHS } from '@common/constants/paths';
import { removeAllCookieStorage } from '@common/helpers/storage';
import axios from 'axios';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_BASE_API_URL,
	timeout: 10000,
	responseType: 'json',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

axiosClient.interceptors.response.use(
	async (response) => {
		if (response && response.data) {
			return response.data.data;
		}

		return response;
	},
	(error) => {
		if (!error.response) {
			return Promise.reject(error);
		}

		switch (error.response?.status) {
			case 401:
				removeAllCookieStorage(['access_token', 'expire_token']);
				window.location.replace(PATHS.connectWallet());
				break;
			case 403:
				if (error.response.data?.code === 403) {
					removeAllCookieStorage(['access_token', 'expire_token']);
				}
				break;

			case 404:
				window.location.href = PATHS.notFound();
				break;

			case 500:
				break;

			default:
				break;
		}

		return Promise.reject(error);
	}
);

export { axiosClient };
