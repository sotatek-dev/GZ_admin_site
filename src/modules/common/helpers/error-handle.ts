import { MessageValidations } from '@common/constants/messages';
import { message } from 'antd';

export const TX_ERROR_CODE = {
	REJECTED: 'ACTION_REJECTED',
	WALLET_CONNECT_REJECTED: -32000,
};

/**
 * Handle Smart Contract interaction error
 * @param err error object from try-catch or promise block
 * @param callback callback handler with tx error state, (updating Tx state usually)
 * @returns void
 */
export const handleTxError = (err: unknown) => {
	const { code } = err as { code: string | number };

	if (
		code === TX_ERROR_CODE.REJECTED ||
		code === TX_ERROR_CODE.WALLET_CONNECT_REJECTED
	) {
		message.error(MessageValidations.MSC_2_10);
		return;
	}

	throw err;
};
