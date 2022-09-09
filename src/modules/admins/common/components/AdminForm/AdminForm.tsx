import './AdminForm.style.scss';
import { Button, Card, Form, Input, Loading, Space } from '@common/components';
import { Admin } from '@admins/common/types';

interface Props {
	title: string;
	admin?: Admin;
	handleSubmit: (formValues: Omit<Admin, '_id'>) => void;
	loading?: boolean;
}

export default function AdminForm({
	title,
	admin,
	handleSubmit,
	loading,
}: Props) {
	if (loading) {
		return <Loading />;
	}

	return (
		<Space direction='vertical' size='middle' className='admin-form'>
			<Card title={title} size='small'>
				<Form
					layout='vertical'
					name='basic'
					autoComplete='off'
					onFinish={handleSubmit}
				>
					<Form.Item
						initialValue={admin?.wallet_address}
						label='Wallet Address'
						name='wallet_address'
						rules={[
							{ required: true, message: 'Please input wallet address!' },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						initialValue={admin?.email}
						label='Email'
						name='email'
						rules={[{ required: true, message: 'Please input email!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						initialValue={admin?.first_name}
						label='First Name'
						name='first_name'
					>
						<Input />
					</Form.Item>
					<Form.Item
						initialValue={admin?.last_name}
						label='Last Name'
						name='last_name'
					>
						<Input />
					</Form.Item>
					<Form.Item style={{ textAlign: 'center' }}>
						<Button htmlType='submit'>Submit</Button>
					</Form.Item>
				</Form>
			</Card>
		</Space>
	);
}

AdminForm.defaultProps = {};
