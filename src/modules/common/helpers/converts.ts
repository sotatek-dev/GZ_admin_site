import BigNumber from 'bignumber.js';
import { message } from '@common/components';

export const toWei = (value: BigNumber.Value) =>
	new BigNumber(value).times(1e18).toString();

export const copyWalletAddress = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		message.success('Copy Sucess');
	} catch (_err: unknown) {
		message.error('Failed to copy!');
	}
};
