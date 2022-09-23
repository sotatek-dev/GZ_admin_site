import { MESSAGES } from '@common/constants/messages';
import { isAddress } from 'ethers/lib/utils';

export const addressValidator = (_: unknown, value: string) => {
	if (value && !isAddress(value)) {
		return Promise.reject(new Error(MESSAGES.MSC121));
	}
	return Promise.resolve();
};

export const emailValidator = (_: unknown, value: string) => {
	if (value && !EMAIL_REGEX.test(value)) {
		return Promise.reject(new Error(MESSAGES.MSC110));
	}
	return Promise.resolve();
};

const EMAIL_REGEX = /^[\w]+@([\w]+\.)+[\w]{2,4}$/;
