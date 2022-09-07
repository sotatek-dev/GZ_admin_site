import axios from 'axios';

const axiosClient = axios.create({
	baseURL: '',
	timeout: 10000,
	responseType: 'json',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export { axiosClient };
