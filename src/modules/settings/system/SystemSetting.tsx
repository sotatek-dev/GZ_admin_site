import './SystemSetting.style.scss';
import {
	Button,
	Card,
	Col,
	Form,
	Input,
	InputNumber,
} from '@common/components';
import { useRedirectBack } from '@common/hooks';

export default function SystemSetting() {
	const goBack = useRedirectBack();

	return (
		<>
			<Button onClick={goBack}>Back</Button>
			<Col span={12} offset={6} className='system-setting'>
				<Card
					size='small'
					title='System Setting'
					className='system-setting-form'
				>
					<Form layout='vertical' name='basic' autoComplete='off'>
						<Form.Item
							label='Treasury Address'
							name='treasury_address'
							rules={[
								{
									required: true,
									message: 'Please input your treasury address!',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							wrapperCol={{ span: 24 }}
							label='Key Price'
							name='key_price'
							rules={[
								{ required: true, message: 'Please input your key price!' },
							]}
						>
							<InputNumber />
						</Form.Item>
						<Form.Item
							label='Rescue Price'
							name='rescue_price'
							rules={[
								{ required: true, message: 'Please input your rescue price!' },
							]}
						>
							<InputNumber />
						</Form.Item>
						<Form.Item
							label='Users may mint key for the first (x) days of the month'
							name='mint_time'
							rules={[
								{ required: true, message: 'Please input time to mint key!' },
							]}
						>
							<InputNumber />
						</Form.Item>
						<Form.Item
							label='User must have minimum (x) token to mint key'
							name='key_mint_min_token'
							rules={[
								{ required: true, message: 'Please input your minimum token!' },
							]}
						>
							<InputNumber />
						</Form.Item>
						<Form.Item style={{ textAlign: 'center' }}>
							<Button htmlType='submit'>Update</Button>
						</Form.Item>
					</Form>
				</Card>
			</Col>
		</>
	);
}
