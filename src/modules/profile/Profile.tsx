import { Admin } from '@admins/common/types';
import { Button, Form, Input, Loading } from '@common/components';
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
				rules={[{ required: true, message: 'Please input wallet address!' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				initialValue={profile?.email}
				label='Email'
				name='email'
				rules={[{ required: true, message: 'Please input email!' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				initialValue={profile?.firstname}
				label='First Name'
				name='firstname'
			>
				<Input />
			</Form.Item>
			<Form.Item
				initialValue={profile?.lastname}
				label='Last Name'
				name='lastname'
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
