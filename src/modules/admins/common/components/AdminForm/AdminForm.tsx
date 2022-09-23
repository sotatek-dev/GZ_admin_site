import './AdminForm.style.scss';
import { Button, Card, Form, Input, Loading, Space } from '@common/components';
import { Admin } from '@admins/common/types';
import { addressValidator, emailValidator } from '@common/helpers/validate';
import { MESSAGES } from '@common/constants/messages';
import { NAME_REGEX } from '@admins/common/constants';

interface Props {
	title: string;
	initData?: {
		admin?: Admin;
		isGetAdmin: boolean;
	};
	finish: {
		onSubmit: (formValues: Omit<Admin, '_id'>) => void;
		isSubmitting: boolean;
	};
}

export default function AdminForm({ title, initData, finish }: Props) {
	const { admin, isGetAdmin } = initData || {};
	const { onSubmit, isSubmitting } = finish;

	if (isGetAdmin) {
		return <Loading />;
	}

	return (
		<Space direction='vertical' size='middle' className='admin-form'>
			<Card title={title} size='small'>
				<Form
					layout='vertical'
					name='basic'
					autoComplete='off'
					onFinish={onSubmit}
				>
					<Form.Item
						initialValue={admin?.wallet_address}
						label='Wallet Address'
						name='wallet_address'
						rules={[
							{ required: true, message: MESSAGES.MSC115 },
							{
								validator: addressValidator,
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						initialValue={admin?.email}
						label='Email'
						name='email'
						rules={[
							{ required: true, message: MESSAGES.MSC115 },
							{
								validator: emailValidator,
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						initialValue={admin?.firstname}
						label='First Name'
						name='firstname'
						rules={[{ pattern: NAME_REGEX, message: MESSAGES.MC6 }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						initialValue={admin?.lastname}
						label='Last Name'
						name='lastname'
						rules={[{ pattern: NAME_REGEX, message: MESSAGES.MC7 }]}
					>
						<Input />
					</Form.Item>
					<Form.Item style={{ textAlign: 'center' }}>
						<Button loading={isSubmitting} htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</Space>
	);
}

AdminForm.defaultProps = {};
