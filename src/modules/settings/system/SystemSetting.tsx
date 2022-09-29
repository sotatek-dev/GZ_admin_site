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
import { useRedirectBack } from '@common/hooks';
import {
	useGetSystemSetting,
	useUpdateSystem,
} from './services/useGetSystemSetting';
import { useCallback, useEffect, useState } from 'react';
import { FieldData } from 'rc-field-form/es/interface';
import { MESSAGES } from '@common/constants/messages';
import { useUpdateKeyNFTSC } from '@admins/setting/mutations/useUpdateKeyNFTSC';
import { useUpdateDNFTSC } from '@admins/setting/mutations/useUpdateDNFTSC';
type SubmitProps<T> = {
	treasury_address: string;
	key_price: T;
	rescure_price: T;
	launch_price: T;
	mint_days: T;
	key_mint_min_token: T;
};
export default function SystemSetting() {
	const goBack = useRedirectBack();
	const {
		updateRescurPriceDNFTSC,
		updateMinimumMintKeyDNFTSC,
		updateLaunchPriceDNFTSC,
		updateTreasuryAddressDNFTSC,
	} = useUpdateDNFTSC();
	const {
		updateLaunchPriceKeyNFTSC,
		updateTreasuryAddressKeyNFTSC,
		updatePriceKeyNFTSC,
	} = useUpdateKeyNFTSC();
	const [disableUpdateBtn, setDisableUpdateBtn] = useState<boolean>(true);
	const { data: initialData = {} } = useGetSystemSetting();
	const [form] = Form.useForm();
	const moneyType = 'BUSD';
	const money: {
		min: number;
		mintKey: number;
		mintKeyDefault: number;
		max: number;
	} = {
		min: 0,
		mintKey: 5,
		mintKeyDefault: 1,
		max: 1000000000,
	};
	const handleConvertFromBUSDToSC = (price: number) => {
		return Math.pow(price * 10, 18);
	};
	const { updateMintDaySystemAdmin, isLoadingSystem } = useUpdateSystem();
	const handleFieldChange = useCallback(
		(_: FieldData[], allFields: FieldData[]) => {
			setDisableUpdateBtn(!allFields?.some((item) => item.value));
		},
		[]
	);
	const handleSubmit = (values: SubmitProps<number>) => {
		const listKeys = Object.keys(values);
		listKeys?.length > 0 &&
			listKeys.forEach((item) => {
				switch (item) {
					case 'treasury_address': {
						if (values[item] !== initialData[item]) {
							updateTreasuryAddressKeyNFTSC(values[item]);
							updateTreasuryAddressDNFTSC(values[item]);
						}
						break;
					}
					case 'key_price': {
						if (values[item] !== initialData[item]) {
							updatePriceKeyNFTSC(
								handleConvertFromBUSDToSC(values[item]).toString()
							);
						}
						break;
					}
					case 'rescure_price': {
						if (values[item] !== initialData[item]) {
							updateRescurPriceDNFTSC(
								handleConvertFromBUSDToSC(values[item]).toString()
							);
						}
						break;
					}
					case 'launch_price': {
						if (values[item] !== initialData[item]) {
							updateLaunchPriceKeyNFTSC(
								handleConvertFromBUSDToSC(values[item]).toString()
							);
							updateLaunchPriceDNFTSC(
								handleConvertFromBUSDToSC(values[item]).toString()
							);
						}
						break;
					}
					case 'key_mint_min_token': {
						if (values[item] !== initialData[item]) {
							updateMinimumMintKeyDNFTSC(values[item]);
						}
						break;
					}
					default:
						break;
				}
			});
		updateMintDaySystemAdmin({
			mint_days: values.mint_days,
		});
	};
	const handleInitialForm = () => {
		form.setFieldsValue({ ...initialData });
	};
	useEffect(() => {
		handleInitialForm();
	}, [initialData]);
	if (isLoadingSystem) {
		return <Loading />;
	}
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
								min={money.min}
								max={money.max}
								defaultValue={money.min}
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								addonAfter={moneyType}
							/>
						</Form.Item>
						<Form.Item
							label='Rescue Price'
							name='rescure_price'
							rules={[{ required: true, message: MESSAGES.MSC115 }]}
						>
							<InputNumber
								min={money.min}
								max={money.max}
								defaultValue={money.min}
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								addonAfter={moneyType}
							/>
						</Form.Item>
						<Form.Item
							label='Launch Price'
							name='launch_price'
							rules={[{ required: true, message: MESSAGES.MSC115 }]}
						>
							<InputNumber
								min={money.min}
								max={money.max}
								defaultValue={money.min}
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								addonAfter={moneyType}
							/>
						</Form.Item>
						<Form.Item
							label='Users may mint key for the first (x) days of the month'
							name='mint_days'
							rules={[{ required: true, message: MESSAGES.MSC115 }]}
						>
							<InputNumber
								min={money.mintKeyDefault}
								defaultValue={money.mintKey}
							/>
						</Form.Item>
						<Form.Item
							label='User must have minimum (x) token to mint key'
							name='key_mint_min_token'
							rules={[{ required: true, message: MESSAGES.MSC115 }]}
						>
							<InputNumber defaultValue={0} min={money.min} max={money.max} />
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
