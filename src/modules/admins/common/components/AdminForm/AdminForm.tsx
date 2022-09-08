import './AdminForm.style.scss';
import { Button, Card, Form, Input, Space } from '@common/components';
import { Admin } from '@admins/common/types';
import { useDeleteAdmin } from '@admins/common/services';

interface Props {
	title: string;
	admin?: Admin;
	handleSubmit: (formValues: Omit<Admin, '_id'>) => void;
}

export default function AdminForm({ admin, handleSubmit }: Props) {
	const isUpdate = !!admin;
	const { deleteAdmin } = useDeleteAdmin();

	return (
		<Space direction='vertical' size='middle' className='admin-form'>
			<Card title='EDIT ADMIN' size='small'>
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
						initialValue={admin?.email}
						label='First Name'
						name='first_name'
					>
						<Input />
					</Form.Item>
					<Form.Item label='Last Name' name='last_name'>
						<Input />
					</Form.Item>
					<Form.Item style={{ textAlign: 'center' }}>
						{isUpdate ? (
							<Button htmlType='submit' onClick={() => deleteAdmin(admin._id)}>
								Delete
							</Button>
						) : null}
						<Button htmlType='submit'>Submit</Button>
					</Form.Item>
				</Form>
			</Card>
		</Space>
	);
}

AdminForm.defaultProps = {};
