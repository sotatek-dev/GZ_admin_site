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
import { useUpdateProfile } from './Profile.mutation';

export default function Profile() {
	const { data: profile, isLoading } = useGetProfile();
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
		>
			<Form.Item
				initialValue={profile?.wallet_address}
				label='Wallet Address'
				name='wallet_address'
				rules={[requiredValidate(), { validator: addressValidator }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				initialValue={profile?.email}
				label='Email'
				name='email'
				rules={[requiredValidate(), { validator: emailValidator }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				initialValue={profile?.firstname}
				label='First Name'
				name='firstname'
				rules={[{ pattern: NAME_REGEX, message: MESSAGES.MC6 }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				initialValue={profile?.lastname}
				label='Last Name'
				name='lastname'
				rules={[{ pattern: NAME_REGEX, message: MESSAGES.MC7 }]}
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
