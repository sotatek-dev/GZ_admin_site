import './SystemSetting.style.scss';
import { useState } from 'react';
import type { FieldData } from 'rc-field-form/es/interface';
import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Loading,
	message,
	Row,
} from '@common/components';
import { useIsSuperAdmin } from '@common/hooks/useIsSuperAdmin';
import { addressValidator, requiredValidate } from '@common/helpers/validate';
import { MESSAGES } from '@common/constants/messages';
import { useGetSCSetting } from './services/queries/useGetSCSetting';
import { useGetBESetting } from './services/queries/useGetBESetting';
import NumberInput from './components/NumberInput';
import { useUpdateDNFTSC } from './services/mutations/useUpdateDNFTSC';
import { useUpdateKeyDNFTSetting } from './services/mutations/useUpdateKeyNFTSC';
import { useUpdateBESetting } from './services/mutations/useUpdateBESetting';
import BigNumber from 'bignumber.js';
import dayjs, { Dayjs } from 'dayjs';
import { ContractReceipt } from 'ethers';
import { useGetLaunchPrice } from '@settings/nft-mint/services/useGetLaunchPrice';
import { handleTxError } from '@common/helpers/error-handle';
import { useAuth } from '@common/hooks';
import { ConnectorKey } from '@web3/connectors';

const pricingToken = 'BUSD';

interface Fields {
	key_price: string;
	min_dnft: string;
	min_token: string;
	mint_days: number;
	mint_key_start_time: Dayjs;
	rescue_price: string;
	treasury_address: string;
	launch_price: string;
}

export default function SystemSetting() {
	const { connectorKey } = useAuth();
	const isSuperAdmin = useIsSuperAdmin();
	const form = Form.useForm()[0];

	const {
		updateRescurPriceDNFTSC,
		updateMinTokenMintKeySC,
		updateTreasuryAddressDNFTSC,
		updateDNFTLaunchPrice,
		isUpdateDNFTSetting,
	} = useUpdateDNFTSC();
	const { launchPrice, isFetchLaunchPrice } = useGetLaunchPrice();

	const {
		updateTreasuryAddressKeyNFTSC,
		updatePriceKeyNFTSC,
		updateMinDNFTRequired,
		updateStartBuyKeyTime,
		isUpdateKeyNFTSetting,
	} = useUpdateKeyDNFTSetting();

	const { updateMintDaySystemAdmin, isUpdateMintDays } = useUpdateBESetting();

	const [fieldsChanged, setFieldsChanged] = useState<{
		[key in keyof Fields]: boolean;
	}>({
		treasury_address: false,
		key_price: false,
		rescue_price: false,
		mint_key_start_time: false,
		mint_days: false,
		min_token: false,
		min_dnft: false,
		launch_price: false,
	});

	const canSubmitUpdate = Object.values(fieldsChanged).some(
		(hasChanged) => hasChanged
	);
	const isUpdatingSetting =
		isUpdateDNFTSetting || isUpdateKeyNFTSetting || isUpdateMintDays;

	const {
		minimumToken,
		rescuePrice,
		treasuryAddress,
		mintKeyStartTime,
		isGetSCSetting,
		keyPrice,
		minimumDnft,
	} = useGetSCSetting();
	const { BESetting, isGetBESetting } = useGetBESetting();

	if (isGetSCSetting || isGetBESetting || isFetchLaunchPrice) {
		return <Loading />;
	}

	const initValue: Partial<Fields> = {
		treasury_address: treasuryAddress,
		key_price: keyPrice?.toString(),
		rescue_price: rescuePrice?.toString(),
		mint_key_start_time:
			mintKeyStartTime == undefined ? undefined : dayjs.unix(mintKeyStartTime),
		mint_days: BESetting?.mint_days,
		min_token: minimumToken?.toString(),
		min_dnft: minimumDnft?.toString(),
		launch_price: launchPrice?.toString(),
	};

	const onFieldsChanged = (changedField: FieldData[]) => {
		const fieldChangedName =
			changedField[0].name.toString() as keyof typeof initValue;
		const previousVal = initValue[fieldChangedName];
		const changedValue = changedField[0].value;

		const isFieldChanged = () => {
			if (previousVal == undefined) return true;
			if (fieldChangedName === 'mint_key_start_time') {
				return !(previousVal as Dayjs).isSame(changedValue);
			}

			// not a number
			if (!Number.isNaN(Number(changedValue))) {
				return previousVal !== changedValue;
			}

			return !new BigNumber(changedValue).isEqualTo(
				previousVal as string | number
			);
		};

		if (
			form.isFieldsTouched() &&
			!form.getFieldsError().filter(({ errors }) => errors.length).length &&
			isFieldChanged()
		) {
			setFieldsChanged({
				...fieldsChanged,
				[fieldChangedName]: true,
			});
			return;
		}

		setFieldsChanged({
			...fieldsChanged,
			[fieldChangedName]: false,
		});
	};

	const handleUpdateSetting = async ({
		key_price,
		min_dnft,
		min_token,
		mint_days,
		mint_key_start_time,
		rescue_price,
		treasury_address,
		launch_price,
	}: Fields) => {
		const changedFields = Object.entries(fieldsChanged).filter(
			([, hasChanged]) => hasChanged
		);

		const lstUpdateCall: Array<
			() => Promise<ContractReceipt | null | undefined | void>
		> = [];
		const updateFns = () => {
			changedFields.forEach(([field]) => {
				switch (field as keyof Fields) {
					case 'treasury_address':
						lstUpdateCall.push(
							() =>
								updateTreasuryAddressKeyNFTSC(treasury_address).then(() =>
									setFieldsChanged((prev) => ({
										...prev,
										treasury_address: false,
									}))
								),
							() =>
								updateTreasuryAddressDNFTSC(treasury_address).then(() =>
									setFieldsChanged((prev) => ({
										...prev,
										treasury_address: false,
									}))
								)
						);
						break;

					case 'key_price':
						lstUpdateCall.push(() =>
							updatePriceKeyNFTSC(
								new BigNumber(key_price).times(1e18).toString()
							).then(() =>
								setFieldsChanged((prev) => ({
									...prev,
									key_price: false,
								}))
							)
						);
						break;

					case 'rescue_price':
						lstUpdateCall.push(() =>
							updateRescurPriceDNFTSC(
								new BigNumber(rescue_price).times(1e18).toString()
							).then(() =>
								setFieldsChanged((prev) => ({
									...prev,
									rescue_price: false,
								}))
							)
						);
						break;

					case 'mint_days':
						lstUpdateCall.push(() =>
							updateMintDaySystemAdmin({ mint_days }).then(() =>
								setFieldsChanged((prev) => ({
									...prev,
									mint_days: false,
								}))
							)
						);
						break;

					case 'mint_key_start_time':
						lstUpdateCall.push(() =>
							updateStartBuyKeyTime(mint_key_start_time.unix()).then(() =>
								setFieldsChanged((prev) => ({
									...prev,
									mint_key_start_time: false,
								}))
							)
						);
						break;

					case 'min_dnft':
						lstUpdateCall.push(() =>
							updateMinDNFTRequired(min_dnft).then(() =>
								setFieldsChanged((prev) => ({
									...prev,
									min_dnft: false,
								}))
							)
						);
						break;

					case 'min_token':
						lstUpdateCall.push(() =>
							updateMinTokenMintKeySC(
								new BigNumber(min_token).times(1e18).toString()
							).then(() =>
								setFieldsChanged((prev) => ({
									...prev,
									min_token: false,
								}))
							)
						);
						break;

					case 'launch_price':
						lstUpdateCall.push(() =>
							updateDNFTLaunchPrice(
								new BigNumber(launch_price).times(1e18).toString()
							).then(() =>
								setFieldsChanged((prev) => ({
									...prev,
									launch_price: false,
								}))
							)
						);
				}
			});
		};

		try {
			updateFns();

			// Notes: Metamask mobile - WalletConnect can call update function one by one
			if (connectorKey === ConnectorKey.walletConnect) {
				for (const updFn of lstUpdateCall) {
					await updFn();
				}
			} else {
				await Promise.all(lstUpdateCall.map((updFn) => updFn()));
			}

			message.success(MESSAGES.MSC22);
		} catch (error) {
			handleTxError(error);
		}
	};

	return (
		<>
			<Row className='system-setting'>
				<Col xs={12}>
					<Card
						size='small'
						title='System Setting'
						className='system-setting-form'
					>
						<Form
							name='customized_form_controls'
							form={form}
							disabled={!isSuperAdmin}
							layout='vertical'
							onFieldsChange={onFieldsChanged}
							onFinish={handleUpdateSetting}
							initialValues={initValue}
						>
							<Form.Item
								label='Treasury Address'
								name='treasury_address'
								rules={[requiredValidate(), { validator: addressValidator }]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label='Key Price'
								name='key_price'
								rules={[requiredValidate()]}
							>
								<NumberInput suffix={pricingToken} />
							</Form.Item>
							<Form.Item
								label='Cosmic Void Rescue Price'
								name='rescue_price'
								rules={[requiredValidate()]}
							>
								<NumberInput suffix={pricingToken} />
							</Form.Item>
							<Form.Item
								label='Launch Price'
								name='launch_price'
								rules={[requiredValidate()]}
							>
								<NumberInput suffix={pricingToken} />
							</Form.Item>
							<Row gutter={24}>
								<Col span={8}>
									<Form.Item
										label='Start Mint Key Time'
										name='mint_key_start_time'
										rules={[
											requiredValidate(),
											{ validator: timeFromNowValidator },
										]}
									>
										<DatePicker
											placeholder='Select time'
											showTime
											format='YYYY/MM/DD HH:mm'
										/>
									</Form.Item>
								</Col>
								<Col span={16}>
									<Form.Item
										label='Users may mint key for the first (x) days of the month'
										name='mint_days'
										rules={[
											requiredValidate(),
											{ validator: numberOnlyValidator },
										]}
									>
										<NumberInput suffix='DAY' validator={[mintDayValidator]} />
									</Form.Item>
								</Col>
							</Row>
							<Form.Item
								label='User must hold (x) token to mint dNFT'
								name='min_token'
								rules={[requiredValidate()]}
							>
								<NumberInput suffix='GXZ' />
							</Form.Item>
							<Form.Item
								label='User must hold (x) dNFT to mint key'
								name='min_dnft'
								rules={[requiredValidate()]}
							>
								<NumberInput suffix='DNFT' />
							</Form.Item>
							<div className='system-setting-form__btn'>
								<Button
									htmlType='submit'
									loading={isUpdatingSetting}
									disabled={!canSubmitUpdate}
								>
									Update
								</Button>
							</div>
						</Form>
					</Card>
				</Col>
			</Row>
		</>
	);
}

const NUMBER_ONLY_REGEX = /^\d+$/;
const mintDayValidator = (value?: string) => {
	return (
		!!value &&
		NUMBER_ONLY_REGEX.test(value) &&
		Number(value) >= 0 &&
		Number(value) <= 31
	);
};

const numberOnlyValidator = (_: unknown, value: string) => {
	const NUMBER_ONLY_REGEX = /^[0-9]*$/;
	if (value && !NUMBER_ONLY_REGEX.test(value)) {
		return Promise.reject(new Error(MESSAGES.MSC111));
	}
	return Promise.resolve();
};

const timeFromNowValidator = (_: unknown, timeValidate: number) => {
	if (dayjs(timeValidate).isBefore(dayjs())) {
		return Promise.reject(MESSAGES.MC9);
	}
	return Promise.resolve();
};
