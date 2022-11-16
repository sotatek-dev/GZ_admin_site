import type { Rule } from 'antd/es/form';
import { MESSAGES } from '@common/constants/messages';
import { isAddress } from 'ethers/lib.esm/utils';

const EMAIL_REGEX =
	/^.{1,64}@([A-Za-z0-9]+([+.-]*[A-Za-z0-9])*){1,253}\.(com|org|net)$/;

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

export const requiredValidate = (): Rule => ({
	required: true,
	message: MESSAGES.MSC115,
});
