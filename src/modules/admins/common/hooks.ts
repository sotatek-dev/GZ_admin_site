import Form from 'antd/es/form';
import { Admin } from '@admins/common/types';
import { fetchWallet } from '@common/services/queries/useCheckAddress';
import { MESSAGES } from '@common/constants/messages';

export const useUniqueAdminAddressValidator = (
	currentAddress: string | undefined
) => {
	const form = Form.useForm<Admin>()[0];
	const address = Form.useWatch('wallet_address', form);

	const uniqueAddressValidator = async (_: unknown, value: string) => {
		if (!currentAddress) {
			return Promise.resolve();
		}

		if (currentAddress === address) {
			return Promise.resolve();
		}

		const data = await fetchWallet(value);

		if (data?.isWalletExist) {
			return Promise.reject(MESSAGES.MSC122);
		}

		return Promise.resolve();
	};

	return { form, uniqueAddressValidator };
};
