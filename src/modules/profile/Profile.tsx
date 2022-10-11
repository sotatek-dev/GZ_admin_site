import { NAME_REGEX } from '@admins/common/constants';
import { Admin } from '@admins/common/types';
import { Button, Form, Input, Loading } from '@common/components';
import { MESSAGES } from '@common/constants/messages';
import {
	addressValidator,
	emailValidator,
	requiredValidate,
} from '@common/helpers/validate';
import { useGetProfile } from '@common/services/queries/useGetProfile';
import { useUniqueAddress } from './Profile.hooks';
import { useUpdateProfile } from './Profile.mutation';

export default function Profile() {
	const { data: profile, isLoading } = useGetProfile();
	const { form, uniqueAddressValidator } = useUniqueAddress();
	const { updateProfile, isUpdateProfile } = useUpdateProfile();

	if (isLoading) {
		return <Loading />;
	}

	const handleFinishForm = (value: Admin) => {
		updateProfile(value);
	};

	return (
		<Form
			layout='vertical'
			name='basic'
			autoComplete='off'
			onFinish={handleFinishForm}
			wrapperCol={{ span: 10 }}
			initialValues={profile}
			form={form}
		>
			<Form.Item
				label='Wallet Address'
				name='wallet_address'
				rules={[
					requiredValidate(),
					{ validator: addressValidator },
					{ validator: uniqueAddressValidator },
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label='Email'
				name='email'
				rules={[requiredValidate(), { validator: emailValidator }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label='First Name'
				name='firstname'
				rules={[
					{ pattern: NAME_REGEX, message: MESSAGES.MC6 },
					{ max: 50, message: MESSAGES.MSC14 },
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label='Last Name'
				name='lastname'
				rules={[
					{ pattern: NAME_REGEX, message: MESSAGES.MC7 },
					{ max: 50, message: MESSAGES.MSC14 },
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item>
				<Button loading={isUpdateProfile} htmlType='submit'>
					Update
				</Button>
			</Form.Item>
		</Form>
	);
}
