import './SystemSetting.style.scss';
import { Button, Card, Col, DatePicker, Form, Input } from '@common/components';

export default function SystemSetting() {
	return (
		<>
			<Button>Back</Button>
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
							label='Key Price'
							name='key_price'
							rules={[
								{ required: true, message: 'Please input your key price!' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label='Rescue Price'
							name='rescue_price'
							rules={[
								{ required: true, message: 'Please input your rescue price!' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label='When to mint key'
							name='mint_time'
							rules={[
								{ required: true, message: 'Please input time to mint key!' },
							]}
						>
							<DatePicker.RangePicker
								showTime
								format='YYYY/MM/DD HH:mm'
								style={{ width: '100%' }}
								placeholder={['Start mint time', 'End mint time']}
							/>
						</Form.Item>
						<Form.Item
							label='User must have minimum (x) token to mint key'
							name='key_mint_min_token'
							rules={[
								{ required: true, message: 'Please input your minimum token!' },
							]}
						>
							<Input />
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
