import './AdminForm.style.scss';
import { useParams } from 'react-router';
import { Button, Card, Form, Input, Loading, Space } from '@common/components';
import { Admin } from '@admins/common/types';
import {
	addressValidator,
	emailValidator,
	requiredValidate,
} from '@common/helpers/validate';
import { MESSAGES } from '@common/constants/messages';
import { NAME_REGEX } from '@admins/common/constants';
import { useUniqueAdminAddressValidator } from '@admins/common/hooks';
import { useGetAdminById } from '@admins/common/services/mutations';

interface Props {
	title: string;
	finish: {
		onSubmit: (formValues: Omit<Admin, '_id'>) => void;
		isSubmitting: boolean;
	};
}

export default function AdminForm({ title, finish }: Props) {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading } = useGetAdminById(id);
	const { onSubmit, isSubmitting } = finish;
	const { form, uniqueAddressValidator } = useUniqueAdminAddressValidator(
		data?.wallet_address
	);

	if (isLoading) {
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
					form={form}
					initialValues={data}
				>
					<Form.Item
						label='Wallet Address'
						name='wallet_address'
						rules={[
							requiredValidate(),
							{
								validator: addressValidator,
							},
							{ validator: uniqueAddressValidator },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Email'
						name='email'
						rules={[
							requiredValidate(),
							{
								validator: emailValidator,
							},
						]}
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
