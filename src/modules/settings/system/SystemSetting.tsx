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
import { InitialProps, SubmitProps } from './type';
import { UseQueryResult } from 'react-query';
import BigNumber from 'bignumber.js';
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
	const { data: initialData } = useGetSystemSetting() as UseQueryResult<
		InitialProps,
		unknown
	>;
	const [form] = Form.useForm();
	const defaultPriceType = 'BUSD';
	const price: {
		min: number;
		mintKey: number;
		mintKeyDefault: number;
		max: number;
		fromBUSDToSC: number;
	} = {
		min: 0,
		mintKey: 5,
		mintKeyDefault: 1,
		max: 1000000000,
		fromBUSDToSC: 1e18,
	};
	const { updateMintDaySystemAdmin, isLoadingSystem } = useUpdateSystem();
	const handleFieldChange = useCallback(
		(_: FieldData[], allFields: FieldData[]) => {
			setDisableUpdateBtn(!allFields?.some((item) => item.value));
		},
		[]
	);
	const formatPrice = (price: number | string) => {
		return `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};
	const handleSubmit = (values: SubmitProps<number>) => {
		const listKeys = Object.keys(values);
		listKeys?.length > 0 &&
			listKeys.forEach((item) => {
				switch (item) {
					case 'treasury_address': {
						if (values[item] !== initialData?.[item]) {
							updateTreasuryAddressKeyNFTSC(values[item]);
							updateTreasuryAddressDNFTSC(values[item]);
						}
						break;
					}
					case 'key_price': {
						if (values[item] !== initialData?.[item]) {
							updatePriceKeyNFTSC(
								new BigNumber(values[item]).times(price.fromBUSDToSC).toString()
							);
						}
						break;
					}
					case 'rescure_price': {
						if (values[item] !== initialData?.[item]) {
							updateRescurPriceDNFTSC(
								new BigNumber(values[item]).times(price.fromBUSDToSC).toString()
							);
						}
						break;
					}
					case 'launch_price': {
						if (values?.[item] || '' !== initialData?.[item] || '') {
							updateLaunchPriceKeyNFTSC(
								new BigNumber(values[item]).times(price.fromBUSDToSC).toString()
							);
							updateLaunchPriceDNFTSC(
								new BigNumber(values[item]).times(price.fromBUSDToSC).toString()
							);
						}
						break;
					}
					case 'key_mint_min_token': {
						if (values?.[item] || '' !== initialData?.[item] || '') {
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
							label='User must have minimum (x) token to mint key'
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
