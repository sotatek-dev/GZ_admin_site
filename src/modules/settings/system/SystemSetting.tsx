import './SystemSetting.style.scss';
import { Button, Card, Col, Form, Input, Loading } from '@common/components';
import { addressValidator, requiredValidate } from '@common/helpers/validate';
import { useRedirectBack } from '@common/hooks';
import { MESSAGES } from '@common/constants/messages';
import useSetting from './services/useSetting';
const TitleComponent = ({ title }: { title: string }) => {
	return (
		<p className='system-setting-form__title'>
			{title}
			<span className='system-setting-form__title__star'>*</span>
		</p>
	);
};
const ErrorComponent = ({ value }: { value: string }) => {
	return value === '' || value === '0' ? (
		<p className='system-setting-form__titleError'>{MESSAGES.MSC115}</p>
	) : (
		<div></div>
	);
};
export default function SystemSetting() {
	const goBack = useRedirectBack();
	const {
		isLoadingSystemStatus,
		handleSubmit,
		fieldCommon,
		disableUpdateBtn,
		handleFieldChange,
		handleRegexField,
		form,
	} = useSetting();
	const defaultPriceType = 'BUSD';
	if (isLoadingSystemStatus) {
		return <Loading />;
	}
	console.log(fieldCommon);
	return (
		<>
			<Button onClick={goBack}>Back</Button>
			<Col span={12} offset={6} className='system-setting'>
				<Card
					size='small'
					title='System Setting'
					className='system-setting-form'
				>
					<Form
						form={form}
						layout='vertical'
						onFieldsChange={handleFieldChange}
						name='basic'
						onFinish={handleSubmit}
						autoComplete='off'
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
						<TitleComponent title='Key Price' />
						<Input
							suffix={defaultPriceType}
							onChange={(e) => handleRegexField(e, 'key_price')}
							value={fieldCommon.key_price}
							status={
								fieldCommon?.key_price === '' || fieldCommon?.key_price === '0'
									? 'error'
									: ''
							}
						/>
						<ErrorComponent value={fieldCommon?.key_price} />
						<TitleComponent title='Rescue Price' />
						<Input
							suffix={defaultPriceType}
							onChange={(e) => handleRegexField(e, 'rescure_price')}
							value={fieldCommon.rescure_price}
							status={
								fieldCommon?.rescure_price === '' ||
								fieldCommon?.rescure_price === '0'
									? 'error'
									: ''
							}
						/>
						<ErrorComponent value={fieldCommon?.rescure_price} />
						<TitleComponent title='Launch Price' />
						<Input
							suffix={defaultPriceType}
							onChange={(e) => handleRegexField(e, 'launch_price')}
							value={fieldCommon.launch_price}
							status={
								fieldCommon?.launch_price === '0' ||
								fieldCommon?.launch_price === ''
									? 'error'
									: ''
							}
						/>
						<ErrorComponent value={fieldCommon?.launch_price} />
						<TitleComponent title='Users may mint key for the first (x) days of the month' />
						<Input
							onChange={(e) => handleRegexField(e, 'mint_days')}
							value={fieldCommon.mint_days}
							status={
								fieldCommon?.mint_days === '0' || fieldCommon?.mint_days === ''
									? 'error'
									: ''
							}
						/>
						<ErrorComponent value={fieldCommon?.mint_days} />
						<TitleComponent title='User must have minimum (x) token to mint key' />
						<Input
							onChange={(e) => handleRegexField(e, 'key_mint_min_token')}
							value={fieldCommon.key_mint_min_token}
							status={
								fieldCommon?.key_mint_min_token === '' ||
								fieldCommon?.key_mint_min_token === '0'
									? 'error'
									: ''
							}
						/>
						<ErrorComponent value={fieldCommon?.key_mint_min_token} />
						<Form.Item className='system-setting-form__btn'>
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
