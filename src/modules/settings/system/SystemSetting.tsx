import './SystemSetting.style.scss';
import {
	Button,
	Card,
	Col,
	Form,
	Input,
	InputNumber,
	Loading,
} from '@common/components';
import { addressValidator, requiredValidate } from '@common/helpers/validate';
import { MESSAGES } from '@common/constants/messages';
import useSetting from './services/useSetting';
export default function SystemSetting() {
	const defaultPriceType = 'BUSD';
	const {
		disableUpdateBtn,
		handleFieldChange,
		isLoadingSystemStatus,
		handleSubmit,
		price,
		form,
	} = useSetting();
	const formatPrice = (price: number | string) => {
		return `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};
	if (isLoadingSystemStatus) {
		return <Loading />;
	}
	return (
		<>
			<Col span={12} offset={6} className='system-setting'>
				<Card
					size='small'
					title='System Setting'
					className='system-setting-form'
				>
					<Form
						form={form}
						onFieldsChange={handleFieldChange}
						layout='vertical'
						name='basic'
						onFinish={handleSubmit}
						autoComplete='off'
						// initialValues={setting}
					>
						<Form.Item
							label='Treasury Address'
							name='treasury_address'
							rules={[
								requiredValidate(),
								{
									validator: addressValidator,
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							wrapperCol={{ span: 24 }}
							label='Key Price'
							name='key_price'
							rules={[{ required: true, message: MESSAGES.MSC115 }]}
						>
							<InputNumber
								min={price.min}
								max={price.max}
								defaultValue={price.min}
								formatter={(value) => formatPrice(value || 0)}
								addonAfter={defaultPriceType}
							/>
						</Form.Item>
						<Form.Item
							label='Rescue Price'
							name='rescure_price'
							rules={[{ required: true, message: MESSAGES.MSC115 }]}
						>
							<InputNumber
								min={price.min}
								max={price.max}
								defaultValue={price.min}
								formatter={(value) => formatPrice(value || 0)}
								addonAfter={defaultPriceType}
							/>
						</Form.Item>
						<Form.Item
							label='Launch Price'
							name='launch_price'
							rules={[{ required: true, message: MESSAGES.MSC115 }]}
						>
							<InputNumber
								min={price.min}
								max={price.max}
								defaultValue={price.min}
								formatter={(value) => formatPrice(value || 0)}
								addonAfter={defaultPriceType}
							/>
						</Form.Item>
						<Form.Item
							label='Users may mint key for the first (x) days of the month'
							name='mint_days'
							rules={[{ required: true, message: MESSAGES.MSC115 }]}
						>
							<InputNumber
								min={price.mintKeyDefault}
								defaultValue={price.mintKey}
							/>
						</Form.Item>
						<Form.Item
							label='User must hold (x) dNFT to mint key'
							name='key_mint_min_token'
							rules={[{ required: true, message: MESSAGES.MSC115 }]}
						>
							<InputNumber defaultValue={0} min={price.min} max={price.max} />
						</Form.Item>
						<Form.Item style={{ textAlign: 'center' }}>
							<Button disabled={disableUpdateBtn} htmlType='submit'>
								Update
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Col>
		</>
	);
}
